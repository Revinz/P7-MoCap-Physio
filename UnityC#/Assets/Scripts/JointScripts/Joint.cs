using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// WIP
/// Doesn't work.
/// </summary>


public class Joint : MonoBehaviour
{
    public string name = "";
    private Vector3 pos;
    private Vector3 rot;

    public Vector3 Position { get => pos; }
    public Vector3 Rotation { get => rot; }

    // Update is called once per frame
    void LateUpdate()
    {

        pos = this.gameObject.transform.position;
        rot = this.gameObject.transform.rotation.eulerAngles;

    }
}
