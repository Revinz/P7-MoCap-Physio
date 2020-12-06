
import React, { useState, useEffect, useRef, Component } from "react";

import { Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import ExerciseFacade from "./facades/ExerciseFacade";

export default class WelcomeScene extends React.Component {
  
  constructor(props) {
    
    super(props);
    console.log("MainScene");

    this.ID = ""

    styles = StyleSheet.create({
      main: {
        flex: 1,
        margin: 50,
        backgroundColor: "#FFF",
        flexDirection: "column",
        //justifyContent: "space-between",
      },
      input: {
        flex: 1,
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
      
      <View style ={styles.main} >
        <ExerciseFacade />
          <View style = {styles.input}>
            <Text>Participant ID</Text>
            <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 1.5}}
              onChangeText={text => {this.ID = text}}  
            />
          </View>
          <View style = {styles.input}>
            <Button
              title="Start"
              color="#f194ff"
              onPress={() => Actions.camera()} //Alert.alert("user ID: ", this.ID)
            />
          </View>
      </View>
    );
    
  } 
   
}
