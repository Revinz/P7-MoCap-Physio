//import React from "react";
import React, { Component } from "react";
import { render } from "react-dom";

import { Text, View } from "react-native";
import { Exercise } from "./exercise.js";
import {
  PoseNetPredictor,
  predictImage,
} from "./Predictors/PoseNetPredictor.js";

export default class ExerciseCounter extends Component { //extends React.Component<props>

  // count_forwardLunge = 0;
  // count_SingleLegDeadlift = 0;
  // count_Squat = 0;
  // count_StandingHipAbduction = 0;
  // count_StepUps = 0;

  //Clamshell Glutebridge oneLeggedDeadLift Squat
  count_exercises = [0, 0, 0, 0]

  constructor() {
   
    super();
    this.addRepetition = this.addRepetition.bind(this);
    this.state = {
      name: "Exercises",
      exercise: 
      [
        {
        name: "ForwardLunge",
        set: 0,
        rep: 0,
        },
        {
        name: "SingleLegDeadlift",
        set: 0,
        rep: 0,
        },
        {
        name: "Squat",
        set: 0,
        rep: 0,
        },
        {
        name: "StandingHipAbduction",
        set: 0,
        rep: 0,
        },
        {
        name: "StepUps",
        set: 0,
        rep: 0,
        },
      ]
    }; 
    console.log("ExerciseCounter");
    //console.log(this.state.exercise.rep, this.state.exercise.name)
  }

  /* constructor(props) {
    super(props);
    console.log("ExerciseCounter");
  } */

  // https://reactjs.org/docs/react-component.html#setstate

  addRepetition(exercise) {
    this.count_exercises[exercise]++;
    console.log(this.count_exercises)
    //this.currentCount++;
    //console.log("Adding rep", this.state.exercise.rep, this.state.exercise.name, this.currentCount)
    //this.setState{}
    
  }
  
  render() {
    return <View></View>;
  }
}
