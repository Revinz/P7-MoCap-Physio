using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PoseAnalyzer : MonoBehaviour
{
    //---------------------------------------
    // Public

    public GameObject pose1_root;
    public GameObject pose2_root;

    public float updateFrequency;
    public float deviationScale;

    public WindowGraph windowGraph;
    //---------------------------------------
    // Private

    private float deviation;

    private IEnumerator analyzeCoroutine;
    private WaitForSeconds waitForSeconds;
    //---------------------------------------

    void Start()
    {
        waitForSeconds = new WaitForSeconds(updateFrequency);
        analyzeCoroutine = AnalyzePoses();
        StartCoroutine(AnalyzePoses());
        //
        //foreach (Transform joint in pose1_root.GetComponentsInChildren<Transform>())
        //{
        //    print(" Name: " + joint.name + "\n | Pos: " + joint.transform.position.ToString("F4") + "\n | LocalPos: " + (joint.transform.position - pose1_root.transform.position).ToString("F4") + "\n--------");
        //}
        //int matchingJoints = 0;

        //foreach (Transform joint_pose1 in pose1_root.GetComponentsInChildren<Transform>())
        //{
        //    foreach (Transform joint_pose2 in pose2_root.GetComponentsInChildren<Transform>())
        //    {
        //        if(joint_pose1.name == joint_pose2.name)
        //        {
        //            print(GetJointDifference(joint_pose1, joint_pose2));
        //            matchingJoints++;
        //        }
        //    }
        //}
        //print("Joints: " + matchingJoints);
    }

    float GetJointDifference(Transform joint_1, Transform joint_2)
    {
        // Returns the distance between the two joints
        // This assumes that the root position are in the same place for both characters
        Vector3 joint_1_localPos = joint_1.position - pose1_root.transform.position;
        Vector3 joint_2_localPos = joint_2.position - pose2_root.transform.position;

        return (joint_2_localPos - joint_1_localPos).magnitude;
    }

    IEnumerator AnalyzePoses()
    {
        // Everytime the coroutine is run (depends on updateFrequency),
        // we look at the difference between the two poses' hand joints, shoulder joints etc. and sum them up in the variable 'deviation'
        // Then we plot the value on the graph
        while (true)
        {
            deviation = 0;

            foreach (Transform joint_pose1 in pose1_root.GetComponentsInChildren<Transform>())
            {
                //Look for the same joint in the other pose and get deviation
                foreach (Transform joint_pose2 in pose2_root.GetComponentsInChildren<Transform>())
                {
                    if (joint_pose1.name == joint_pose2.name)
                    {
                        //print(GetJointDifference(joint_pose1, joint_pose2));
                        deviation += GetJointDifference(joint_pose1, joint_pose2) * deviationScale;
                        continue; // We go to next iteration of the loop since we found the joint we were looking for
                    }
                }
            }
            print("Deviation: " + deviation);
            windowGraph.CreateCircle(new Vector2(Time.fixedTime * 25, deviation));
            yield return waitForSeconds;
        }
    }

    void Update()
    {
        
        //if (Time.fixedTime % updateFrequency != 0)
        //{
        //    return;
        //}
        //print(Time.fixedTime);

        //deviation = 0;

        //foreach (Transform joint_pose1 in pose1_root.GetComponentsInChildren<Transform>())
        //{
        //    foreach (Transform joint_pose2 in pose2_root.GetComponentsInChildren<Transform>())
        //    {
        //        if (joint_pose1.name == joint_pose2.name)
        //        {
        //            //print(GetJointDifference(joint_pose1, joint_pose2));
        //            deviation += GetJointDifference(joint_pose1, joint_pose2);
        //        }
        //    }
        //}
        //print("Deviation: " + deviation);
    }
}
