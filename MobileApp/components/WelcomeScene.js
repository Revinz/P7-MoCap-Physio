import React, { useState, useEffect, useRef, Component } from "react";

import {
  Button,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { Actions } from "react-native-router-flux";
import ExerciseFacade from "./facades/ExerciseFacade";
import { UpdateParticipantToken } from "./facades/firebaseFacade";

export default class WelcomeScene extends React.Component {
  constructor(props) {
    super(props);
    console.log("MainScene");

    this.ID = "";

    styles = StyleSheet.create({
      main: {
        flex: 1,
        margin: 50,
        backgroundColor: "#FFF",
        flexDirection: "column",
        //justifyContent: "space-between",
      },
      input: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        flexDirection: "column",
      },
    });

    //this.exerciseFacade = new ExerciseFacade();
  }

  async componentDidMount() {}

  render() {
    //Note: the onPress={} requires the '() =>' to be able to work properly
    //Actions.camera() simply means it goes to the camera page.
    return (
      <View style={styles.input}>
        <Text>WELCOME PAGE!</Text>
        <ExerciseFacade />
        <Text>Participant ID</Text>
        <TextInput
          style={{
            width: "80%",
            height: 75,
            fontSize: 40,
            textAlign: "center",
            borderColor: "black",
            borderWidth: 1.5,
          }}
          onChangeText={(text) => {
            this.ID = text;
          }}
        />
        <Button
          title="Start"
          style={{
            width: "80%",
            height: 100,
          }}
          color="#f194ff"
          onPress={() => {
            if (!this.ID) return;
            UpdateParticipantToken(this.ID);
            Actions.camera();
          }} //Alert.alert("user ID: ", this.ID)
        />
      </View>
    );
  }
}
