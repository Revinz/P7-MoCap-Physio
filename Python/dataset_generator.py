import os
import pathlib
from pathlib import Path
import random
import csv
import numpy as np
import pandas as pd
import cv2 as cv
import shutil

# --- Settings for dataset generation ---

# How many excerpts to make per video
#   the smallest vid is 64 frames being just about 2.2s long, most are around 150+ frames.
#       - the only downside of making too many is that it might make too many overlapping/similar excerpts
#         which leads to a false increase in accuracy (aka. overfitting)
#               - Might be possible to counteract this with dropouts.
amountOfExcerptsPerVid = 5

# How many frames to use per video
#   high should, in theory, be more accurate, but slower.
amountOfFramesPerExcerpt = 5

# How many frames to skip between each frame to use for the output (0 means no frames skipped)
# use frame x and x + framesToSkip + 1 (so first and every 'framesToSkip+1'th frame)
# ex. (framesToSkip = 5): frame 0 and frame 6
framesToSkip = 5

#Write the folder names for each of the excercises
exercises = 'ClamShells GluteBridge \
    SingleLegDeadlift Squat'.split()

# What type of frames to generate (e.g normal frame, flipped frame etc. )
excerptTypesToGen = "original flipped".split()

# ---------- Optional Settings ------------

# Change this to 'None' if you want it to be random.
# You can always try different values - using the same value should give the same result every time.
random_seed = 1

# Img file type to save as(e.g. jpg) without the '.'
imgFileType = "jpg"

# --- End of Settings ---
'''
 Dataset generation code below here (Don't touch!)
'''

videos_path = "videos"
output_folder = "dataset"

random.seed(random_seed)

#Count how many original videos there are (for calculation of how many outputs there will be)
p = Path.cwd()  # get current dir
p = Path(videos_path)  # directory that we want to count all the files in
f = [y for y in p.rglob(f'*')]
#get all unique files and count them
values, counts = np.unique(
    [x.parent for x in f],
    return_counts=True)  #get all unique files and count them
# -len(exercises) because the above also counts a directory and this removes the directory count
amountOfVideos = -len(exercises)
for count in counts:  # get sum of files
    amountOfVideos += count

totalExcerptToBeGenerated = amountOfExcerptsPerVid * amountOfVideos * len(
    excerptTypesToGen)
print(f'Total excerpts to be generated: {totalExcerptToBeGenerated}')


# If padding ends up being required, simply add implementation here
def pad_image(frame):
    return frame


def gen_flipped(frame):
    return cv.flip(frame, 1)  #Flips left to right (aka horizontally)


def gen_original(frame):
    return frame


# Delete previously generated files
try:
    shutil.rmtree(output_folder)
    print("Deleted previously generated files.")
except:
    pass

print("Creating new files...")
progress = 0
# Starting generating the new files
for exercise in exercises:
    #Create directory, incl. missing parent folders, for the exercise
    pathlib.Path(f'{output_folder}/{exercise}').mkdir(parents=True,
                                                      exist_ok=True)

    # Generate the dataset videos for all the files in the folder
    for filename in os.listdir(f'{videos_path}/{exercise}'):
        video_path = f'{videos_path}/{exercise}/{filename}'

        #Open the video
        vidcap = cv.VideoCapture(video_path)

        # Get all the frames from the video
        videoFrames = []
        while vidcap.isOpened():
            success, image = vidcap.read()
            videoFrames.append(image)

            # success returns false when there aren't more frames left.
            if not success:
                break

        # Close video and all windows that was opened
        vidcap.release()

        # Generate video excerpts
        totalFrames = len(videoFrames)

        for i in range(0, amountOfExcerptsPerVid):

            #Starting frame index
            startIndex = random.randint(
                0, totalFrames - (amountOfFramesPerExcerpt *
                                  (framesToSkip + 1)) - 1)

            # Create all the frames for the excerpt types for the current excerpt
            for excerptType in excerptTypesToGen:

                excerpt_path = f'{output_folder}/{exercise}/{filename}_{i}_{excerptType}'

                lastSavedFrameNumber = startIndex
                savedImgCount = 0
                for frameNumber in range(startIndex, totalFrames - 1):

                    #Skip the rest of the frames when enough frames have been saved.
                    if (savedImgCount >= amountOfFramesPerExcerpt):
                        break

                    #Don't save frames that should be skipped
                    #   Remove +1 if you want every nth frame instead of every n+1th frame.
                    if (frameNumber - lastSavedFrameNumber >=
                            framesToSkip + 1):
                        frameToSave = videoFrames[frameNumber]

                        # Pad the image (Not implemented, but here in case it is required - simply implement the function for padding)
                        frameToSave = pad_image(frameToSave)

                        # Process the image according to the excerpt type
                        if (excerptType == "original"):
                            frameToSave = gen_original(frameToSave)
                        elif (excerptType == "flipped"):
                            frameToSave = gen_flipped(frameToSave)
                        else:
                            raise ValueError(
                                f'Can not process except type of "{excerptType}". Did you misspell it?'
                            )

                        #Create folder path for the output
                        pathlib.Path(f'{excerpt_path}').mkdir(parents=True,
                                                              exist_ok=True)
                        #Save the frame
                        #Might want to subtract the startIndex to start the img count from 0 instead of the startIndex number
                        cv.imwrite(
                            f'{excerpt_path}/{frameNumber}.{imgFileType}',
                            frameToSave)

                        savedImgCount += 1
                        lastSavedFrameNumber = frameNumber

                # Print progress
                progress += 1
                print(f'Progress: {progress}/{totalExcerptToBeGenerated}')
