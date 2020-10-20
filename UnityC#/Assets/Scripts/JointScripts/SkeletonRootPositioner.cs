using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SkeletonRootPositioner : MonoBehaviour
{
    GameObject rootNode = null;
    private Transform rootStartTransform;
    
    // Start is called before the first frame update
    void Start()
    {
        rootStartTransform = rootNode.transform;
    }

    // Update is called once per frame
    void Update()
    {
        //Modify all joints based on difference between startpos and current pos
        foreach (JointGizmo joint in rootNode.GetComponentsInChildren<JointGizmo>()) {
            
        }
    }
}
