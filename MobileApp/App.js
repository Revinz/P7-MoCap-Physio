import { StatusBar } from "expo-status-bar";
//import * as React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from "react-native";

import {Permissions} from 'expo'
//import { captureRef } from 'react-native-view-shot';
import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef, Component } from 'react';

//To test if AsyncStorage is working
import AsyncStorage from "@react-native-community/async-storage";
//test if RNFS works
var RNFS = require("react-native-fs");
//test if tensorflow works
import TensorflowTestComponent from "./TensorflowTestComponent";


export default function App() {
  const [toggleButton, setButton] = useState(null);
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const captureDelayMS = 0;
  const options = { quality: 0.5, base64: true, skipProcessing: false };
  var recording = false;  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const ToggleRecording = async() => {
    
    recording = !recording
    
    if(recording) {
      toggleButton.setState({textValue: 'Stop recording'})
      //this.ToggleButton.setState({textValue: 'Stop recording'});
      CaptureImage();
    } else {
      toggleButton.setState({title: 'Start recording'})
      //this.ToggleButton.setState({textValue: 'Start recording'});
    }
  }

  const CaptureImage = async() =>
  {
    if(camera) {
      console.log("Taking picture")
      const data = await camera.takePictureAsync(options);
      console.log("Took picture")
      const source = data.uri;
      console.log("uri: ", source);
      //console.log("path: ", source.path); returns undefined
      if (recording) {
      setTimeout(CaptureImage, captureDelayMS); // Run function again after delay
      }
      /* if (source) {
        console.log("data")
        handleSave(source);
      } */
    }
  }
  
  const handleSave = async (photo) => {
    /* const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === 'granted') {
      }
    if (permission.status === "granted") { */
      const assert = await MediaLibrary.createAssetAsync(photo);
      await MediaLibrary.createAlbumAsync("Test", assert);
    /* } else {
      console.log("No permission");
    } */
  };

  return (
    
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.lightbulb}>
        <Image source={require('./images/lightbulb.png')} />
        </View>
        <View style={{ flex: 6, flexDirection: 'column' }}>
          <View style={{ flex: 1, fontSize: 12}}>
            <Text style={styles.boldText}>Remember!</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.standardText}>You can perform exercise sets in any order</Text>
          </View>
        </View>
        <View style={{ flex: 1.5 }}>
        <Text style={styles.standardText}>Burger menu</Text>
        </View>
      </View>
      <Camera ref={ref => setCamera(ref)} style={{ flex: 6 }} type={type}>
        <View
          style={styles.cameraview}>
          <TouchableOpacity
            style={styles.flipbutton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.flipText}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Button title={recording ? 'Stop recording':'Start recording'} ref={ref => setButton(ref)} onPress={ToggleRecording}/>
    </View>
  );
}

const styles = StyleSheet.create({
  
  main: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'column',
  },
  header: {
    flex: 1, 
    flexDirection: 'row',
  },
  lightbulb: {
    width: 50,
    height: 50,
    flex: 1,
    padding: 20,
  },
  cameraview: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flipbutton: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  recordbutton: {
    flex: 1,
    flexDirection: 'row',
  },
  standardText: {
    fontSize: 18,
    margin: 5,
    color: 'black',
  },
  boldText: {
    fontSize: 18,
    margin: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  flipText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
});
