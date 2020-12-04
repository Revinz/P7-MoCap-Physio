import { math } from "@tensorflow/tfjs";
import { max } from "react-native-reanimated";

/**
 * @deprecated
 * */

export default class RepProgressEstimator() {

    estimate(exercise, pose) {

        switch (exercise.toLower()) {
            case "squat":
                const hipCenter = this.averagePos([getJointPos("leftHip", pose), getJointPos("rightHip", pose)])
                const hipFloorPos =  [hipCenter.x, 0]
                const kneeCenter = this.averagePos([getJointPos("leftKnee", pose), getJointPos("rightKnee", pose)])
                return angle(kneeCenter, hipFloorPos, hipCenter)
                break;
            case "Stepups":
            case "forwardlunge":
                //For this exercise we simply just look at the angle between the knees
                const hipCenter = this.averagePos([getJointPos("leftHip", pose), getJointPos("rightHip", pose)])
                return angle(hipCenter, getJointPos("leftKnee", pose), getJointPos("rightKnee", pose))
                break;

            case "singlelegdeadlift":
            case "standinghipabduction":
                const hipCenter = this.averagePos([getJointPos("leftHip", pose), getJointPos("rightHip", pose)])
                return angle(hipCenter, getJointPos("leftAnkle", pose), getJointPos("rightAnkle", pose))
                break;

            default:
                throw new Error("No such exercise:" + exercise)
        }


    }

    /**
     * See link for joint names:
     * https://www.tensorflow.org/lite/models/pose_estimation/overview
     */
    getJointPos(joint, pose) {
        
        pose["keypoints"].forEach(keypoint => {
            if (keypoint["part"] == joint)
                return {x: parseInt(keypoint["location"]["x"]), y: parseInt(keypoint["location"]["y"])}
        });

        return throw new Error("Couldn't find joint with name:" + joint);
    }

    averagePos(jointArray) {
        const tmpSum = jointArray.reduce(([sumX, sumY], joint) => {
            sumX + parseInt(joint.x)
            sumY + parseInt(joint.y)
        })
        return {x: tmpSum[0] / jointArray.length, y: tmpSum[1] / jointArray.length};
    }

    /**
     * Calculates the angle at A
     */
    angle(posA, posB, posC) {
        
    }

    distance(posA, posB) {
        
    }


}