import React from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

export default class ExerciseFacade extends React.Component {
  constructor(props) {
    super(props);
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
    console.log(data);
    Alert.alert("NEW MESSAGE: ", JSON.stringify(data));
    return;
    switch (data.action) {
      case "SET_CURR_EXERCISE":
        break;
      case "DECREASE_REM_REPS":
        break;
      case "DECREASE_REM_SETS":
        break;
    }
  }

  render() {
    return null;
  }
}
