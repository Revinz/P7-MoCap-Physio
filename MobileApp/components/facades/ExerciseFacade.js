import React from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import AudioManager from "../AudioManager.js";

export default class ExerciseFacade extends React.Component {
  
  
  constructor(props) {
    super(props);
    console.log(props.setCurrExercise);
    console.log(props.currExercise);
    console.log(props.progress);

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
    console.log(this.props.currExercise);
  }

  onMessageReceived(remoteMessage) {
    const json = JSON.stringify(remoteMessage);
    const data = JSON.parse(json).data;
    const params = JSON.parse(data.params)
    console.log("ID:", data.ID);
    console.log("Test type:", data.testtype);
    //Alert.alert("NEW MESSAGE: ", JSON.stringify(data));
    //return;
    console.log("data action", data.action);
    switch (data.action) {
      
      case "EXERCISE_MISTAKE":
        console.log("Mistake made");
        AudioManager.playMistakeAudio();
        break;

      case "SET_CURR_EXERCISE":
        console.log("Setting exercise", params.exercise);
        this.props.setCurrExercise(params.exercise)
        break;

      case "INCREASE_CURR_REPS":
      
        // Increase rep by 1
        // If rep == 10 then increase set and reset reps
        // Also check if we reach the max set

        console.log("Increasing reps");
        let reps = this.props.progress[this.props.currExercise].reps;
        let sets = this.props.progress[this.props.currExercise].sets;

        // Increase rep by 1
        reps++;
        this.props.setProgress(this.props.currExercise, reps, sets)
        
        AudioManager.playRepFeedback(reps, data.testtype)
        // If rep == 10 then increase set, reset reps, and play audio feedback
        if (reps == 10) {
          
          reps = 0;
          sets++;
          this.props.setProgress(this.props.currExercise, reps, sets)
          console.log("A")
          console.log("Sets done", sets, "of", this.props.progress[this.props.currExercise].maxSets);
          console.log("B")
          AudioManager.playSetFeedback(sets);
          console.log("C")
          // Check if we reach the max set
          if (sets == this.props.progress[this.props.currExercise].maxSets) {
            console.log("D")
            console.log("Done with exercise" , this.props.currExercise);
            
          }
        }
        break;
      // case "INCREASE_CURR_SETS":
      //   console.log("Increasing sets");
        
      //   this.count_exercises[this.currentExercise].sets++;
      //   break;
      default:
        console.log("Error in message", data.action);
        break;
    }
    console.log("Exercise", this.currentExercise, this.count_exercises)
  }

  render() {
    return null;
  }
}
