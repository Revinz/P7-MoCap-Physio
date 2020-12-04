import * as tf from "@tensorflow/tfjs";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import React from "react";
import { Text, View, Image } from "react-native";
import * as pn from "@tensorflow-models/posenet";
import * as jpeg from "jpeg-js";
import { tensor3d } from "@tensorflow/tfjs";

export default class PoseNetPredictor {
  constructor() {
    console.log("PoseNetPredictor");

    this.poseNetSettings = {
      architecture: "MobileNetV1",
      outputStride: 8,
      inputResolution: { width: 64, height: 64 },
      multiplier: 0.5,
    };
    this.poseNet = null;
    this.isReady = false;
  }

  async Setup() {
    await tf.ready();

    this.poseNet = await pn.load(this.poseNetSettings);

    this.isReady = true;
  }

  async LoadImageAsTensor3D(imgPath): Tensor3D {
    //Used to load bundled image -- not used for real-time
    //const imageAssetPath = Image.resolveAssetSource(test_image);
    //imgPath = imageAssetPath.uri;

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

  async predictImage(image) {
    if (!this.isReady) {
      throw Error(
        "PoseNetPredictor is not setup. Please run the Setup method before using."
      );
    }
    //Load Image
    //let image = await this.LoadImageAsTensor3D(imagePath);

    //PreProcess Image
    //image = this.resizeImage(image);
    //image = this.normalizeImage(image);

    //Predict on Image
    const pose = await this.poseNet.estimateSinglePose(image, {
      flipHorizontal: false,
    });

    return pose;
  }
}
