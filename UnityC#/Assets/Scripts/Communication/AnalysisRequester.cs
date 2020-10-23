using AsyncIO;
using NetMQ;
using NetMQ.Sockets;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;

/**
 * 
 * Requests analysis of all the joint for the given frame.
 *  - See what data is being sent at the bottom of the file.
 * */
public interface IRealTimeRequester
{
    void Update();
}

[Serializable]
public class AnalysisRequester : RunAbleThread, IRealTimeRequester
{
    public static JointsData data = new JointsData(new Joint[0]);

    public void Update()
    {
        Debug.Log("Updating");
        GameObject hips = GameObject.Find("Hips");
        Joint[] joints = hips.GetComponentsInChildren<Joint>();
        Debug.Log(joints.Length);
        lock (data)
        {
            AnalysisRequester.data = new JointsData(joints);
            Debug.Log("Updated data");

        }
    }

    protected override void Run()
    {

        ForceDotNet.Force(); // this line is needed to prevent unity freeze after one use, not sure why yet
        using (RequestSocket client = new RequestSocket())
        {
            client.Connect("tcp://localhost:5555");

            while (Running) //Keep sending latest data to the server for analysis
            {
                //Might want to check if the data has been updated and only send if it has - to increase performance.
                string jsonToSend = "ERROR HAPPENED";
                lock (AnalysisRequester.data)
                {                   
                    jsonToSend = JsonUtility.ToJson(data);
                    Debug.Log(jsonToSend);
                    client.SendFrame(jsonToSend);
                }
                // ReceiveFrameString() blocks the thread until you receive the string, but TryReceiveFrameString()
                // do not block the thread, you can try commenting one and see what the other does, try to reason why
                // unity freezes when you use ReceiveFrameString() and play and stop the scene without running the server
                //                string message = client.ReceiveFrameString();
                //                Debug.Log("Received: " + message);
                string message = null;
                bool gotMessage = false;
                while (Running)
                {
                    gotMessage = client.TryReceiveFrameString(out message); // this returns true if it's successful
                    if (gotMessage) break;
                }

                if (gotMessage) Debug.Log("Received " + message);
                
            }


        }

        NetMQConfig.Cleanup(); // this line is needed to prevent unity freeze after one use, not sure why yet
    }
}

/**
 * 
 * This is all the data that is going to be sent to the python script every frame.
 * 
 * */

[Serializable]
public class JointsData
{
    public JointDTO[] jointDTOs = new JointDTO[0];

    public JointsData(Joint[] joints)
    {
        //Update the jointDTOs array with new joints.
        jointDTOs = new JointDTO[joints.Length];
        for (int i = 0; i < joints.Length; i++)
        {
            jointDTOs[i] = new JointDTO(joints[i]);
        }

    }

}

