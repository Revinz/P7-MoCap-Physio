var fs = require("fs");
var tf = require("@tensorflow/tfjs-node");
var pn = require("@tensorflow-models/posenet");
const { createCanvas, Image } = require("canvas");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
var recursive = require("recursive-readdir");

/**
 *
 *  Settings
 *
 */

// IMPORTANT: You change the architecture here (you will be required to change it to the one we will be using)
// https://github.com/tensorflow/tfjs-models/blob/master/posenet/README.md
const width = 256;
const height = 256;
let PoseNetSettings = {
  architecture: "MobileNetV1",
  outputStride: 16,
  inputResolution: { width: width, height: height }, //Must match the
  multiplier: 0.75,
};

// If the exercise label is incorrect, change this value.
//
let label_index = 3; //See

/**
 *
 *  Dataset generation
 *
 */

// Path to the generated python dataset
const pyDataset = "../Python/dataset";

//Path to the output csv
const outputFile = "PoseDataset.csv";

let net;
let progress = 0;
let totalFiles = "Unknown";

//Delete and create new csv file
//fs.unlinkSync(outputFile); //Deletes the file
const csvWriter = createCsvWriter({
  path: outputFile,
  header: [
    { id: "nose", title: "Nose" },

    { id: "rightEye", title: "Right Eye" },
    { id: "leftEye", title: "Left Eye" },

    { id: "rightEar", title: "Right Ear" },
    { id: "leftEar", title: "Left Ear" },

    { id: "rightShoulder", title: "Right Shoulder" },
    { id: "leftShoulder", title: "Left Shoulder" },

    { id: "rightElbow", title: "Right Elbow" },
    { id: "leftElbow", title: "Left Elbow" },

    { id: "rightWrist", title: "Right Wrist" },
    { id: "leftWrist", title: "Left Wrist" },

    { id: "rightHip", title: "Right Hip" },
    { id: "leftHip", title: "Left Hip" },

    { id: "rightKnee", title: "Right Knee" },
    { id: "leftKnee", title: "Left Knee" },

    { id: "rightAnkle", title: "Right Ankle" },
    { id: "leftAnkle", title: "Left Ankle" },
    { id: "label", title: "exercise" },
    { id: "filepath", title: "File Path" },
  ],
  append: false,
});

async function GenerateDataset() {
  // First load posenet
  net = await pn.load(PoseNetSettings);

  //Add the header - required to add a row
  await csvWriter.writeRecords({}).then(() => {
    console.log("Created Header");
  });

  //Remove the empty row by overwriting the CSV
  let csv = fs.readFileSync(outputFile, "utf8").split("\n");
  fs.writeFileSync(outputFile, csv[0] + "\n");

  //Set the CSV writer to append mode to not overwrite the csv file
  csvWriter.append = true;

  //Find All files in dataset directory
  recursive(pyDataset, function (err, files) {
    //files = files.slice(0, 10);
    totalFiles = files.length;
    //console.log(files);

    //Then generate dataset
    for (let i = 0; i < totalFiles; i++) {
      const path = files[i];
      GetPose(path).then((pose) => {
        SavePose(path, pose);
        console.log(path);
      });
      progress++;
      console.log(`Progress: ${progress}/${totalFiles}`);
    }

    console.log("\n Finished  - Please check if the labels look correct");
    console.log("\n if they are incorrect, change 'labels_index' in line 25");
  });
}

// Get pose
async function GetPose(path) {
  // We need to load the image in a canvas first
  // since Tensorflow does not support files directly loaded
  // from storage.
  const img = new Image();
  img.src = path;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  //Convert the canvas image to something tensorflow can use
  const input = tf.browser.fromPixels(canvas);

  const pose = await net.estimateSinglePose(input, {
    flipHorizontal: false,
  });

  return pose;
}

function SavePose(filepath, pose) {
  const data = [{}];
  //Pose[0] = score
  pose["keypoints"].forEach((e) => {
    data[0][e.part] = [e.position.x, e.position.y];
    //console.log(e.part + ":" + data[0][e.part]);
  });

  //Include file name and label for exercise
  data[0]["filepath"] = filepath;
  data[0]["label"] = filepath.split("\\")[label_index]; //Split path and take labels from the correct position in the array

  csvWriter.writeRecords(data);
}

GenerateDataset();
