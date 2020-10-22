using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;


/**
 * 
 * DTO = Data Transfer Object.
 * Used to transfer the minimum amount of data required to the python script per joint.
 * 
 * */


[Serializable]
public class JointDTO
{
    public string name;
    public float posX;
    public float posY;
    public float posZ;

    public float rotX;
    public float rotY;
    public float rotZ;

    public JointDTO(Joint joint)
    {
        name = joint.name;
        posX = joint.Position.x;
        posY = joint.Position.y;
        posZ = joint.Position.z;

        rotX = joint.Rotation.x;
        rotY = joint.Rotation.y;
        rotZ = joint.Rotation.z;
    }

    public string Json()
    {
        return JsonUtility.ToJson(this, false);
    }
}


