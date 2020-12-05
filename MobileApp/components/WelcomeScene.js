import React from "react";
import { Button, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import ExerciseFacade from "./facades/ExerciseFacade";

export default class WelcomeScene extends React.Component {
  constructor(props) {
    super(props);
    console.log("MainScene");
    //this.exerciseFacade = new ExerciseFacade();
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
        <ExerciseFacade />
      </TouchableOpacity>
    );
  }
}
