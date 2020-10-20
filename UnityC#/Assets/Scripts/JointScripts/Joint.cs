using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// WIP
/// Doesn't work.
/// </summary>


public class Joint : MonoBehaviour
{
    private Vector3 pos;
    private Vector3 rot;

    public Vector3 Position { get => pos; }
    public Vector3 Rotation { get => rot; }

    public Vector3 prevPosition;

    private void Update()
    {
        prevPosition = this.gameObject.transform.position;
    }
    // Update is called once per frame
    void LateUpdate()
    {
        if (Application.isEditor)
            return;

        pos = this.gameObject.transform.position;
        rot = this.gameObject.transform.rotation.eulerAngles;

        if (Mathf.Abs(Vector3.Distance(prevPosition, pos)) > 0.05f) {
            this.gameObject.transform.position = prevPosition;
        }

    }
}
