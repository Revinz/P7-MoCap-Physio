import React from "react";
import { Text } from "react-native";

const props = {
  totalSets: Number,
  remainingSets: Number,
  repsPerSet: Number,
  remainingRepsForCurrSet: Number,
};

export default class Exercise extends React.Component<props> {
  constructor(props) {
    super(props);
    console.log(props);
    console.log("ExerciseCounter");
  }

  render() {
    return null;
  }
}
