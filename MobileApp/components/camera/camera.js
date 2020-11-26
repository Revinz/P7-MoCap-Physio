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

/**
 *
 *  TODO: Convert to ReactComponent
 *
 */
/*
export default class CameraScene extends React.Component {
  constructor(props) {
    super(props);
    console.log("Camera");
  }

  //Returns how it looks
  render() {
    return (
      <Text>CAMERA SCENE</Text>
    );
  }
} */


//------------------------------------------------------------------------------------------------------------
// AUDIO
var Sound = require('react-native-sound');
Sound.setCategory('Playback'); // Enable playback in silence mode

// https://www.npmjs.com/package/react-native-sound
// Save your sound clip files under the directory android/app/src/main/res/raw
// Note that files in this directory must be lowercase, underscored and begin with a letter (e.g. my_file_name.mp3) and that subdirectories are not supported by Android.

try {
  var audio_pleaseBegin = new Sound('voice_2_1_please_begin.mp4', Sound.MAIN_BUNDLE);
  var audio_firstDone = new Sound('voice_2_2_first_repetition_done', Sound.MAIN_BUNDLE);
  var audio_secondDone = new Sound('voice_3_3_second.mp4', Sound.MAIN_BUNDLE);
  var audio_didWrongTryAgain = new Sound('voice_1_1_did_wrong_try_again.mp4', Sound.MAIN_BUNDLE);

} catch (error) {
  console.log("Error loading audio: ", error)
}
//------------------------------------------------------------------------------------------------------------

const CameraScene = () => {
  let [toggleButton, setButton] = useState(null);
  let [camera, setCamera] = useState(null);
  let [hasPermission, setHasPermission] = useState(null);
  let [type, setType] = useState(Camera.Constants.Type.back);
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


  var currentRep = 0;

  function GiveAudioFeedback() {

    switch(currentRep) {
      case 0:
        audio_pleaseBegin.play();
        break;
      case 1:
        audio_firstDone.play();
        break;
      case 2:
        audio_secondDone.play();
        break;
      default:
        console.log("Give audio feedback went wrong")
    }

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

  var CaptureImage = async () => {
    if (camera) {
      //console.log("Taking picture");
      try {
        camera
          .takePictureAsync(options)
          .then((data) => {
            console.log("Picture taken...");
            //console.log("Height: " + data.height);
            //console.log("width: " + data.width);
            
          });
      } catch (err) {
        console.log(err);
      }

      if (recording) {
        setTimeout(CaptureImage, captureDelayMS); // Run function again after delay
      }
    }
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
        r
        onCameraReady={() => {
          console.log("Camera ready");audio_pleaseBegin.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        })}}
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
