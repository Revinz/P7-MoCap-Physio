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
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import React, { useState, useEffect, useRef, Component } from "react";
import ExerciseCounter from "../ExerciseCounter.js";
import PoseNetPredictor from "../Predictors/PoseNetPredictor.js";

const TensorCamera = cameraWithTensors(Camera);

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

  let captureDelayMS = 20;
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
      //CaptureImage();
    } else {
      toggleButton.setState({ title: "Start recording" });
      //this.ToggleButton.setState({textValue: 'Start recording'});
    }
  };

  // https://js.tensorflow.org/api_react_native/0.2.1/ tensor camera doc

  const HandleCameraStream = async (images, updatePreview, gl) => {
    await tf.ready();
    console.log("TF ready")

    let GLOBAL_START_ID = 0;

    if (!netPredictor.isReady) {
      await netPredictor.Setup();
    }

    const loop = async () => {

      //console.log("A");

      if (recording) {
        const nextImageTensor = images.next().value

        // TODO: Send/save tensor here to make a video

        //--------------------------------------------
        const idx = GLOBAL_START_ID;
        GLOBAL_START_ID = GLOBAL_START_ID + 1;
        console.log("Image: ", idx, nextImageTensor);
        
        console.log("Taking picture", idx);
             
        
        //Process the last img
        console.log("Before predict");
        netPredictor.predictImage(nextImageTensor).then(async (results) => {
          console.log("After predict");
          //const tmp_all_results = processedResults;
          //tmp_all_results.push(results);
          //updateProcessedResults(tmp_all_results);
        });

       /*  try {
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
        } 
        catch (err) {
          console.log(err);
        } 

        if (recording) {
          setTimeout(CaptureImage, captureDelayMS); // Run function again after delay
        }*/
        setTimeout(loop, captureDelayMS); // Run function again after delay when recording
      } else {
        setTimeout(loop, 1); // Loop instantly if not recording
      }
      
      

      // if autorender is false you need the following two lines.
      // updatePreview();
      // gl.endFrameEXP();

      //requestAnimation(loop);
    }
    loop();
  }



  /* let GLOBAL_START_ID = 0;

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
  }; */

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

  let textureDims;
   if (Platform.OS === 'ios') {
    textureDims = {
      height: 1920,
      width: 1080,
    };
   } else {
    textureDims = {
      height: 1200,
      width: 1600,
    };
   }
   
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

      <TensorCamera
        // Standard Camera props
        style={{flex:6}}
        type={Camera.Constants.Type.front}
        // Tensor related props
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={64}
        resizeWidth={64}
        resizeDepth={3}
        onReady={HandleCameraStream}
        autorender={true}
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
      </TensorCamera>
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