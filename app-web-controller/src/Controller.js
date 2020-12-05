import React from "react";

const BASE_URL = "http://localhost:3001";

export default class Controller extends React.Component {
  componentDidMount() {
    console.log("Sending Message to app");
    this.testFetch();
  }

  async testFetch() {
    const data = await fetch(BASE_URL + "/test").then((r) => r.json());
    console.log(data);
  }

  render() {
    return <p>Controller Rendered</p>;
  }
}
