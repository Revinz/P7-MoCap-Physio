import React from "react";
import messaging from "@react-native-firebase/messaging";

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
    const data = remoteMessage.data;
    console.log("NEW MESSAGE: ", JSON.stringify(remoteMessage));
    return;
    switch (data.type) {
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
