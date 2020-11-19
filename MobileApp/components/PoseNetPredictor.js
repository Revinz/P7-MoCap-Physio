import * as tf from "@tensorflow/tfjs";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import React from "react";
import { Text, View, Image } from "react-native";
import * as pn from "@tensorflow-models/posenet";
import * as jpeg from "jpeg-js";

import test_image from "../assets/images/test_pose.jpeg";
import { tensor3d } from "@tensorflow/tfjs";

export class PoseNetPredictor extends React.Component<props> {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
    };
    this.state.poseNet = undefined;
    this.state.poseNetLoaded = false;
    console.log("PoseNetPredictor");

    this.state.poseNetSettings = {
      architecture: "MobileNetV1",
      outputStride: 16,
      inputResolution: { width: 256, height: 256 }, //Must match the
      multiplier: 0.75,
    };
  }

  async componentDidMount() {
    // Wait for tf to be ready.
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    this.setState({
      isTfReady: true,
    });

    this.LoadPoseNet();
  }

  async LoadPoseNet() {
    const net = await pn.load();

    this.setState({
      poseNetLoaded: true,
      poseNet: net,
    });

    this.predictImage(null);
  }

  async LoadImageAsTensor3D(imgPath): Tensor3D {
    //Used to load bundled image -- not used for real-time
    const imageAssetPath = Image.resolveAssetSource(test_image);
    imgPath = imageAssetPath.uri;

    //Get image from uri
    const response = await fetch(imgPath, {}, { isBinary: true });

    //Get the raw img data and make a tensor3d from it
    const rawImgData = await response.arrayBuffer();
    tensorImg = this.imageToTensor(rawImgData);
    return tensorImg;
  }

  resizeImage(tensorImg) {
    return tensorImg;
  }

  //TODO: Find source to this piece of code.
  //Converts U8IntByte to Tensor3D
  imageToTensor(rawImageData): Tensor3D {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    return tf.tensor3d(buffer, [width, height, 3]);
  }

  normalizeImage(tensorImg) {
    return tensorImg; //tf.math.l2_normalize(tensorImg);
  }

  async predictImage(imagePath) {
    if (!this.state.poseNetLoaded) {
      console.log("PoseNet Model not loaded");
      return undefined;
    }
    //Load Image
    let image = await this.LoadImageAsTensor3D("../images/test_pose.jpeg");

    //PreProcess Image
    //image = this.resizeImage(image);
    //image = this.normalizeImage(image);

    //Predict on Image
    const pose = await this.state.poseNet.estimateSinglePose(image, {
      flipHorizontal: false,
    });

    console.log(pose);
  }

  render() {
    return (
      <View>
        <Text>
          PoseNetPredictor {this.state.poseNetLoaded ? "Loaded" : "Not Loaded"}
        </Text>
      </View>
    );
  }
}
