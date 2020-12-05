import React from "react";

export default class Controller extends React.Component {
  componentDidMount() {
    console.log("Sending Message to app");
    
  }

  render() {
    return <p>Controller Rendered</p>;
  }
}
