import csv
import pandas as pd
data = pd.read_csv("./PoseDataset.csv", error_bad_lines=False)
#print(data.head(20))
print(len(data))
dataSorted = data.sort_values(["FolderID", "Frame Number"], ascending=True)
#print(dataSorted.head(20))

dataSorted.to_csv("SortedPoseDataSet.csv")