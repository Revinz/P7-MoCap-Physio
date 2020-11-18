import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import React from "react";
import { Button, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

export default class WelcomeScene extends React.Component {
  constructor(props) {
    super(props);
    console.log("MainScene");
  }

  async componentDidMount() {}

  render() {
    //Note: the onPress={} requires the '() =>' to be able to work properly
    //Actions.camera() simply means it goes to the camera page.
    return (
      <TouchableOpacity
        style={{ margin: 128 }}
        onPress={() => Actions.camera()}
      >
        <Text>WELCOME PAGE!</Text>
      </TouchableOpacity>
    );
  }
}
