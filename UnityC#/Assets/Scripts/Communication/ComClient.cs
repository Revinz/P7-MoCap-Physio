using NetMQ;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/**
 * 
 * The client used by Unity to connect to 
 * 
 * */

public class ComClient : MonoBehaviour
{
    [SerializeField]
    public RunAbleThread requester = new AnalysisRequester();
    private void Start()
    {
        requester.Start();
    }

    private void Update()
    {
        // Check if it implements the interface
        IRealTimeRequester realTimeReqester = requester as IRealTimeRequester;
        if (realTimeReqester != null)
            realTimeReqester.Update();
    }

    private void OnDestroy()
    {
        requester.Stop();
        NetMQConfig.Cleanup(); // this line is needed to prevent unity freeze after one use, not sure why yet
    }
}
