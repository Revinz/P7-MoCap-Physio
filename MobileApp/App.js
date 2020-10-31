import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
//To test if AsyncStorage is working
import AsyncStorage from "@react-native-community/async-storage";
//test if RNFS works
var RNFS = require("react-native-fs");
//test if tensorflow works
import TensorflowTestComponent from "./TensorflowTestComponent";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TensorflowTestComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
