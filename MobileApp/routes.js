import React from "react";
import { Router, Scene } from "react-native-router-flux";
import WelcomeScene from "./components/WelcomeScene.js";
//import CameraScene from "./components/camera/tensorcamera.js";
import wiz_of_oz_camera from "./components/camera/wiz_of_oz_camera.js";

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
      <Scene
        key="camera"
        component={wiz_of_oz_camera}
        title="Camera"
        hideNavBar={true}
      />
    </Scene>
  </Router>
);
export default Routes;
