import csv
import pandas as pd

data = pd.read_csv("../PoseNetDatasetGeneration/PoseDataset.csv")
print(data.head(20))
dataSorted = data.sort_values(["FolderID", "Frame Number"], ascending=True)
print(dataSorted.head(20))

dataSorted.to_csv("SortedPoseDataSet.csv")