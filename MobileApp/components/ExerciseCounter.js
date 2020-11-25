import React from "react";
import { Text, View } from "react-native";
import { Exercise } from "./exercise.js";
import {
  PoseNetPredictor,
  predictImage,
} from "./Predictors/PoseNetPredictor.js";

export default class ExerciseCounter extends React.Component<props> {
  constructor(props) {
    super(props);
    console.log("ExerciseCounter");
  }

  render() {
    return <View></View>;
  }
}
