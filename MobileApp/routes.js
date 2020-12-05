import React from "react";
import { Router, Scene } from "react-native-router-flux";
import WelcomeScene from "./components/WelcomeScene.js";

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="welcome"
        component={WelcomeScene}
        title="Welcome"
        initial={true}
        hideNavBar={true}
      />
    </Scene>
  </Router>
);
export default Routes;
