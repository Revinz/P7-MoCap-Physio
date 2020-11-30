import * as tf from "@tensorflow/tfjs";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import React from "react";
import { Text, View, Image } from "react-native";
import * as pn from "@tensorflow-models/posenet";
import * as jpeg from "jpeg-js";
import { tensor3d } from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

const modelJson = require("../../models/model60_1/model.json");
const modelWeight1 = require("../../models/model60_1/group1-shard1of4.bin");
const modelWeight2 = require("../../models/model60_1/group1-shard2of4.bin");
const modelWeight3 = require("../../models/model60_1/group1-shard3of4.bin");
const modelWeight4 = require("../../models/model60_1/group1-shard4of4.bin");
const modelWeights = [modelWeight1, modelWeight2, modelWeight3, modelWeight4];

export default class ExercisePredictor {
  constructor() {
    console.log("ExercisePredictor");
    this.model = undefined;
    this.isReady = false;
    this.model = undefined;
    this.Poses = [];
  }

  async Setup() {
    this.model = await tf.loadLayersModel(
      bundleResourceIO(modelJson, modelWeights)
    );
    this.isReady = true;
  }

  async predictExercise(pose) {
    if (!this.isReady) {
      throw Error(
        "ExercisePredictor is not setup. Please run the Setup method before using."
      );
    }
    const poseJointLocationsOnly = [];
    pose["keypoints"].forEach((joint) => {
      //Skip joints here as well.

      //Add x and y position separately.
      poseJointLocationsOnly.push(joint["position"]["x"]);
      poseJointLocationsOnly.push(joint["position"]["y"]);
    });
    this.Poses.push(poseJointLocationsOnly);
    if (this.Poses.length >= 11) {
      //Take the last 10 elements
      const last10Poses = this.Poses.slice(
        Math.max(this.Poses.length - 10, 0),
        this.Poses.length
      );

      //Predict on joints
      const poseTensor = tf.tensor3d(last10Poses.flat(), [1, 10, 34]);
      console.log("Predicting exercise...");
      const prediction = this.model.predict(poseTensor);
      console.log("Prediction:");
      console.log(prediction.arraySync());
      //console.log(pose);r
      return undefined;
      r;
    }

    console.log("Not enough poses gathered to be able to predict.");
    return undefined;
  }
}
