import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { StatusBar } from "expo-status-bar";
//import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

import { Permissions } from "expo";
//import { captureRef } from 'react-native-view-shot';
import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef, Component } from "react";
import ExerciseCounter from "../ExerciseCounter.js";
import PoseNetPredictor from "../Predictors/PoseNetPredictor.js";

import AudioManager from "../AudioManager.js";
const audioManager = new AudioManager();
//audioManager.setupAudio();

const CameraScene = () => {
  let [toggleButton, setButton] = useState(null);
  let [camera, setCamera] = useState(null);
  let [hasPermission, setHasPermission] = useState(null);
  let [type, setType] = useState(Camera.Constants.Type.back);
  const netPredictor = new PoseNetPredictor();

  /* variables used for processing */
  const AMOUNT_FRAMES_FOR_PROCESSING = 5;
  let [pictureURIs, updatePictureList] = useState([]);
  // Results from the posenet processing
  let [processedResults, updateProcessedResults] = useState([]);

  let captureDelayMS = 50;
  var options = {
    quality: 1,
    base64: true,
    skipProcessing: true,
  };
  var recording = false;

  useEffect(() => {
    (async () => {
      var { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  var ToggleRecording = async () => {
    recording = !recording;

    if (recording) {
      toggleButton.setState({ title: "Stop recording" });
      //this.ToggleButton.setState({textValue: 'Stop recording'});
      CaptureImage();
    } else {
      toggleButton.setState({ title: "Start recording" });
      //this.ToggleButton.setState({textValue: 'Start recording'});
    }
  };

  let GLOBAL_START_ID = 0;
  var CaptureImage = async () => {
    const idx = GLOBAL_START_ID;
    GLOBAL_START_ID = GLOBAL_START_ID + 1;
    if (!netPredictor.isReady) {
      await netPredictor.Setup();
    }
    if (camera) {
      try {
        camera.takePictureAsync(options).then((data) => {
          console.log("Picture taken...");
          console.log("Height: " + data.height);
          console.log("width: " + data.width);

          //add new image uri to the list with all the uris
          const tmp_pictureList = pictureURIs;
          tmp_pictureList.push(data.uri);
          updatePictureList(tmp_pictureList);
          console.log(pictureURIs.length);
          console.log(idx);

          //Process the last img
          console.log("Before predict");
          netPredictor.predictImage(data.uri).then(async (results) => {
            console.log("After predict");
            const tmp_all_results = processedResults;
            tmp_all_results.push(results);
            updateProcessedResults(tmp_all_results);
          });
        });
      } catch (err) {
        console.log(err);
      }

      if (recording) {
        setTimeout(CaptureImage, captureDelayMS); // Run function again after delay
      }
    }
  };

  var PoseNetProcessImg = async (img_uri) => {
    //Posenet process and then save it
    frameResult = await netPredictor.predictImage(data.uri);
    console.log(frameResult);
    const tmp_all_results = processedResults;
    tmp_all_results.push(frameResult);
    updateProcessedResults(tmp_all_results);
  };

  var PredictExercise = () => {
    //run it on our model
  };

  return (
    <View style={styles.main}>
      <ExerciseCounter />
      <View style={styles.header}>
        <View style={styles.lightbulb}>
          {/*<Image source={require("./images/lightbulb.png")} />*/}
        </View>
        <View style={styles.hintText}>
          <View style={{ flex: 1, fontSize: 12 }}>
            <Text style={styles.boldText}>Remember!</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.standardText}>
              You can perform exercise sets in any order
            </Text>
          </View>
        </View>
        <View style={{ flex: 1.5 }}>
          <Text style={styles.standardText}>Burger menu</Text>
        </View>
      </View>

      <Camera
        ref={(ref) => setCamera(ref)}
        style={{ flex: 6 }}
        type={type}
        onCameraReady={() => {
          console.log("Camera ready");
          AudioManager.playAudioFeedback(0, 0);
        }}
        useCamera2Api={true}
        autoFocus={false}
        pictureSize={"360x480"}
        ratio={"1:1"}
      >
        <View style={styles.cameraview}>
          <TouchableOpacity
            style={styles.flipbutton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.flipText}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Button
        title={recording ? "Stop recording" : "Start recording"}
        ref={(ref) => setButton(ref)}
        onPress={ToggleRecording}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "column",
  },
  header: {
    flex: 1,
    flexDirection: "row",
  },
  lightbulb: {
    width: 50,
    height: 50,
    flex: 1,
    padding: 20,
  },
  hintText: {
    flex: 6,
    flexDirection: "column",
  },
  cameraview: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  flipbutton: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  recordbutton: {
    flex: 1,
    flexDirection: "row",
  },
  standardText: {
    fontSize: 18,
    margin: 5,
    color: "black",
  },
  boldText: {
    fontSize: 18,
    margin: 5,
    color: "black",
    fontWeight: "bold",
  },
  flipText: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CameraScene;
