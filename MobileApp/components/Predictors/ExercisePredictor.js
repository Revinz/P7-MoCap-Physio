import * as tf from "@tensorflow/tfjs";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import React from "react";
import { Text, View, Image } from "react-native";
import * as pn from "@tensorflow-models/posenet";
import * as jpeg from "jpeg-js";
import { tensor3d } from "@tensorflow/tfjs";

export default class ExercisePredictor {
  constructor() {
    console.log("ExercisePredictor");

    this.isReady = false;
  }

  async Setup() {
    this.isReady = true;
  }

  async predictExercise(imagePath) {
    if (!this.isReady) {
      throw Error(
        "ExercisePredictor is not setup. Please run the Setup method before using."
      );
    }

    //Predict on Image

    //console.log(pose);
    return undefined;
  }
}
