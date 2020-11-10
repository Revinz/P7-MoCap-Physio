import * as tf from '@tensorflow/tfjs-node'
print("hello")
const imageBuffer = await fs.readFile("dataset")
tfimage = tfnode.node.decodeImage(imageBuffer) //Converts it to a tensor
model.predict(tfimage)