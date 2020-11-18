import React from "react";
import { Text, View } from "react-native";
import { Exercise } from "./exercise.js";
import { PoseNetPredictor, predictImage } from "./PoseNetPredictor.js";

export default class ExerciseCounter extends React.Component {
  constructor(props) {
    super(props);
    console.log("ExerciseCounter");
  }

  render() {
    return (
      <View>
        <PoseNetPredictor />
      </View>
    );
  }
}
