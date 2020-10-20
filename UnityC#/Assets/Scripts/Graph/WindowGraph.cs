using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class WindowGraph : MonoBehaviour
{

    private RectTransform graphContainer;
    public int circleSize;
    [SerializeField] private Sprite circleSprite;
    private void Awake()
    {
        graphContainer = transform.Find("GraphContainer").GetComponent<RectTransform>();
        //List<int> valueList = new List<int>() { 5, 98, 56, 45, 30, 22, 17, 15, 13, 17, 25, 37, 40, 36, 33 };
        //ShowGraph(valueList);
    }

    public GameObject CreateCircle(Vector2 anchoredPosition)
    {

        GameObject circleObject = new GameObject("circle", typeof(Image));
        circleObject.transform.SetParent(graphContainer, false);
        circleObject.GetComponent<Image>().sprite = circleSprite;
        RectTransform rectTransform = circleObject.GetComponent<RectTransform>();
        rectTransform.anchoredPosition = anchoredPosition;
        rectTransform.sizeDelta = new Vector2(circleSize, circleSize);
        rectTransform.anchorMin = new Vector2(0, 0);
        rectTransform.anchorMax = new Vector2(0, 0);
        circleObject.GetComponent<Image>().useSpriteMesh = true;
        return circleObject;
    }

    private void ShowGraph(List<int> valueList)
    {
        float graphHeight = graphContainer.sizeDelta.y;
        float yMaximum = 100f; 
        float xSize = 50f; // Distance between each x value

        GameObject lastCircleGameObject = null;
        for (int i = 0; i < valueList.Count; i++)
        {
            float xPosition = xSize + i * xSize;
            float yPosition = (valueList[i] / yMaximum) * graphHeight; // Normalize values
            GameObject circleGameObject = CreateCircle(new Vector2(xPosition, yPosition));
            if (lastCircleGameObject != null)
            {
                CreatePointConnection(lastCircleGameObject.GetComponent<RectTransform>().anchoredPosition, circleGameObject.GetComponent<RectTransform>().anchoredPosition);
            }
            lastCircleGameObject = circleGameObject;
        }
    }

    private void CreatePointConnection(Vector2 pointPositionA, Vector2 pointPositionB)
    {
        GameObject lineConnection = new GameObject("pointConnection", typeof(Image));
        lineConnection.transform.SetParent(graphContainer, false);
        lineConnection.GetComponent<Image>().color = new Color(1, 1, 1, .5f);
        RectTransform rectTransform = lineConnection.GetComponent<RectTransform>();
        Vector2 dir = (pointPositionB - pointPositionA).normalized;
        float distance = Vector2.Distance(pointPositionA, pointPositionB);
        rectTransform.anchorMin = new Vector2(0, 0);
        rectTransform.anchorMax = new Vector2(0, 0);
        rectTransform.sizeDelta = new Vector2(distance, 3f); // Set the rectangle to be a bar with 3 height and a width equal to the distance between the two points
        rectTransform.anchoredPosition = pointPositionA + dir * distance * .5f;
        rectTransform.localEulerAngles = new Vector3(0, 0, Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg);
    }
}
