import cv2 as cv
import pandas as pd
import numpy as np
import os
import pathlib
from pathlib import Path
import shutil
from tqdm import tqdm

start = 0
end = -1

show = False
save = True

joints_dataset_folder = "Dataset_Joints"

data_joints = pd.read_csv("./PoseDataset.csv", error_bad_lines=False)
file_paths = data_joints["File Path"]
file_paths.head(5)
data_joints = data_joints.drop(["exercise", "File Path", "FolderID", "Frame Number"], axis=1)
print(len(data_joints.columns))

# Delete previously generated files
try:
    shutil.rmtree(f"./{joints_dataset_folder}")
    print("Deleted previously generated joint location image files.")
except:
    pass

if end is -1:
    end = len(data_joints) # Might need a +1?

for i in tqdm(range(start, end)):
    image = cv.imread(file_paths[i])
    for joint in data_joints.columns:
        location = data_joints[joint].iloc[i]
        splitLocation = location.split(",", 1)         
        image = cv.circle(image, (int(float(splitLocation[0])), int(float(splitLocation[1]))), 3, (255, 0, 0), 3)

    if (show):
        cv.imshow("Image", image)
        cv.waitKey(0)

    if (save):
        split_path = file_paths[i].split("\\")
        split_path[2] = joints_dataset_folder
        split_path.pop(0)
        split_path[0] = os.getcwd()
        path = os.path.join(*split_path)
        folder_path = os.path.join(*split_path[:-1])
        pathlib.Path(folder_path).mkdir(parents=True, exist_ok=True)
        cv.imwrite(path, image)
    
