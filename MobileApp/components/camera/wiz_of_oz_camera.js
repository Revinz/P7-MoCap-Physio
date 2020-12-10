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

import { useKeepAwake } from 'expo-keep-awake';
import { Permissions } from "expo";
//import { captureRef } from 'react-native-view-shot';
import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef, Component } from "react";

import AudioManager from "../AudioManager.js";
import { UpdateParticipantToken } from "../facades/firebaseFacade";
import ExerciseFacade from "../facades/ExerciseFacade";

//audioManager.setupAudio();

const CameraScene = (props) => {
  console.log("A")
  useKeepAwake();
  console.log("B")
  let [toggleButton, setButton] = useState(null);
  let [camera, setCamera] = useState(null);
  let [hasPermission, setHasPermission] = useState(null);
  let [type, setType] = useState(Camera.Constants.Type.back);

  let recording = false;

  //Send token to firebase
  UpdateParticipantToken(props.ID);

  const [currExercise, setCurrExercise] = useState("squat");
  const [exerciseProgress, updateProgress] = useState({
    squat: {reps: 0, sets:0, maxSets: 3},
    standing_hip_abduction: {reps: 0, sets:0, maxSets: 3},
    step_ups: {reps: 0, sets:0, maxSets: 3},
    single_leg_deadlift: {reps: 0, sets:0, maxSets: 3},
    lunges: {reps: 0, sets:0, maxSets: 3},
  });

  const setProgress = async(exerciseToUpdate, newReps, newSets) => {
    console.log("Updating progress")
    console.log(exerciseToUpdate)
    console.log(newReps)
    console.log(newSets)
    let tmpProgress = {...exerciseProgress};
    tmpProgress[exerciseToUpdate].reps =  newReps;
    tmpProgress[exerciseToUpdate].sets =  newSets;
    updateProgress(exerciseProgress => tmpProgress)
    console.log(exerciseProgress[currExercise].reps)
  }
  setProgress.bind(this)

  const setExercise = async (exercise) => {
    console.log("Setting curr exercise")
    setCurrExercise(exercise)
  }
  setExercise.bind(this)

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
    } else {
      toggleButton.setState({ title: "Start recording" });
      //this.ToggleButton.setState({textValue: 'Start recording'});
    }
  };

  return (
    <View style={styles.main}>
      <ExerciseFacade setCurrExercise={setExercise} setProgress={setProgress} currExercise={currExercise} progress={exerciseProgress} />
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
      </View>
      <View style = {styles.wizard_of_oz}> 
        <View>
          <Text style={styles.boldText}>Exercise</Text>
          <View>
            <Text style={styles.standardText}>
              {currExercise.split("_").join(" ")}
            </Text>
          </View>
        </View>
        <View>
        </View>
        <View>
          <View>
            <Text style={styles.boldText}>Reps left</Text>
          </View>
          <View>
            <Text style={styles.standardText}>
              {10 - exerciseProgress[currExercise].reps}
            </Text>
          </View>
        </View>
      </View>
      <Camera
        ref={(ref) => setCamera(ref)}
        style={{ flex:7 }}
        type={type}
        onCameraReady={() => {console.log("Camera ready")}}
        useCamera2Api={true}
        autoFocus={false}
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
  wizard_of_oz: {
    flex: 1,
    //alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: "space-between",
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
