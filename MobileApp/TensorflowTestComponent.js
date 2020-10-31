import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import React from "react";
import { Text } from "react-native";

export default class TensorflowTestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
    };
    console.log("Test");
  }

  async componentDidMount() {
    // Wait for tf to be ready.
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    this.setState({
      isTfReady: true,
    });
  }

  render() {
    return (
      <Text>Tensorflow is {this.state.isTfReady ? "Ready" : "Not Ready"}</Text>
    );
  }
}
