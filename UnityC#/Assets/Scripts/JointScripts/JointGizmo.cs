using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteInEditMode]
public class JointGizmo : MonoBehaviour
{
    #region Fields
    public float gizmoSphereSize = 0.07f;
    public float gizmoLineLength = 0.2f;
    public Vector3 rotOffset = Vector3.zero;
    private Vector3 pos;
    private Vector3 rot;
    #endregion

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.green;

        //Location
        Gizmos.DrawSphere(gameObject.transform.position, gizmoSphereSize);

        //Joint facing direction
        Gizmos.DrawLine(gameObject.transform.position,
            gameObject.transform.position + gameObject.transform.forward.normalized * gizmoLineLength);
    }
}
