using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SkeletonFixedPosition : MonoBehaviour
{
    
    public GameObject hipsNode = null;
    private Vector3 hipStartPos;
    private Quaternion hipStartRot;

    //Offset for the hips' current values to start values
    private Vector3 posOffset = Vector3.zero;
    private Quaternion rotOffset = Quaternion.identity;

    // Start is called before the first frame update
    void Start()
    {
        hipStartPos = hipsNode.transform.position;
        hipStartRot = hipsNode.transform.rotation;
    }

    // Update is called once per frame
    void LateUpdate()
    {
        //Modify all joints based on difference between startpos and current pos
        hipsNode.gameObject.transform.position = hipStartPos;
        
        //TODO: Make the model always face the same way no matter the direction of the real animation
        //      For the sake of easier calculations.
    }

}
