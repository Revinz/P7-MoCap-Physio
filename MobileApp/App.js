import { StatusBar } from "expo-status-bar";
//import * as React from "react";
import React from "react";
import { View, AppRegistry } from "react-native";
//To test if AsyncStorage is working
import AsyncStorage from "@react-native-community/async-storage";
//test if RNFS works
var RNFS = require("react-native-fs");
//test if tensorflow works
//import TensorflowTestComponent from "./TensorflowTestComponent";
import Routes from "./routes.js";
import firebase from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";
messaging()
  .subscribeToTopic("P7")
  .then(() => console.log("Subscribed to P7"));

export default function App() {
  return <Routes />;
}
