import React from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

export default class ExerciseFacade extends React.Component {
  
  
  constructor(props) {
    super(props);

    this.currentExercise = 0;
    this.count_exercises = [[0, 0, 0, 0],[0, 0, 0, 0]];
  }

  componentDidMount() {
    //Listens for any message

    const exerciseSubscription = messaging().onMessage(
      async (remoteMessage) => {
        this.onMessageReceived(remoteMessage);
      }
    );

    return exerciseSubscription;
  }

  componentDidUpdate() {
    //Listens for any message
    const exerciseSubscription = messaging().onMessage(
      async (remoteMessage) => {
        onMessageReceived(remoteMessage);
      }
    );

    return exerciseSubscription;
  }

  onMessageReceived(remoteMessage) {
    const json = JSON.stringify(remoteMessage);
    console.log(json);
    const data = JSON.parse(json).data;
    const params = JSON.parse(data.params)
    console.log(data.ID);
    console.log(data.testtype);
    console.log(params.exercise)
    Alert.alert("NEW MESSAGE: ", JSON.stringify(data));
    //return;
    console.log("data action", data.action);
    switch (data.action) {
      
      case "SET_CURR_EXERCISE":
        console.log("Setting exercise", data.exercise);
        this.currentExercise = data.exercise
        break;
      case "INCREASE_CURR_REPS":
        console.log("Increasing reps");
        this.count_exercises[0, this.currentExercise]++;
        break;
      case "INCREASE_CURR_SETS":
        console.log("Increasing sets");
        this.count_exercises[1, this.currentExercise]++;
        break;
    }
    console.log("Exercise", this.currentExercise, this.count_exercises)
  }

  render() {
    return null;
  }
}
