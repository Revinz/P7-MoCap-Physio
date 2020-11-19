import sklearn
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from numpy import array
from keras.models import Sequential
from keras.layers import Flatten, LSTM
from keras.layers.core import Dense
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import minmax_scale
import time
# ______________________________________________Data preparation________________________________________
data = pd.read_csv('SortedPoseDataSetV2.csv')  # Which dataset to read, change versions with V1, V2, V3, etc.

data["exercise"].replace({"ClamShells": 0, "GluteBridge": 1, "SingleLegDeadlift": 2, "Squat": 3}, inplace=True)
target = data["exercise"]  # Extracts only the target for later prediction

nFrames = np.amax(data["Frame Number"]) + 1  # Length of frames pr. Sequences.
target = target[0::nFrames]  # Splits target into the total number of sequences
nSeq = len(target)  # Total number of sequences
# res = type(target) == str
# print result
# print("Is variable a string ? : " + str(res))

# Remove the columns we don't need.
# Drop all unnecessary data columns
data.drop(["exercise"], inplace=True, axis=1)
data.drop(["File Path"], inplace=True, axis=1)
data.drop(["FolderID"], inplace=True, axis=1)
data.drop(["Frame Number"], inplace=True, axis=1)
data.drop(data.columns[0], inplace=True, axis=1)  # Remove the mystery first column
#print("dtypes: ", data.dtypes)
#print("sorted data:  ", data)

columns = list(data)
for i in columns:
    data[[i + "X", i + "Y"]] = data[[i][0]].str.split(",", expand=True)
    # print(data[[i + "X", i + "Y"]])
    data.drop([i], inplace=True, axis=1)
# data[["noseX", "noseY"]] = data.Nose.str.split(",", expand=True)
#
# data[["Right EyeX", "Right EyeY"]] = data["Right Eye"].str.split(",", expand=True)
# data[["Left EyeX", "Left EyeY"]] = data["Left Eye"].str.split(",", expand=True)
#
# data[["Right EarX", "Right EarY"]] = data["Right Ear"].str.split(",", expand=True)
# data[["Left EarX", "Left EarY"]] = data["Left Ear"].str.split(",", expand=True)
#
# data[["Right ShoulderX", "Right ShoulderY"]] = data["Right Shoulder"].str.split(",", expand=True)
# data[["Left ShoulderX", "Left ShoulderY"]] = data["Left Shoulder"].str.split(",", expand=True)
#
# data[["Right ElbowX", "Right ElbowY"]] = data["Right Elbow"].str.split(",", expand=True)
# data[["Left ElbowX", "Left ElbowY"]] = data["Left Elbow"].str.split(",", expand=True)
#
# data[["Right WristX", "Right WristY"]] = data["Right Wrist"].str.split(",", expand=True)
# data[["Left WristX", "Left WristY"]] = data["Left Wrist"].str.split(",", expand=True)
#
# data[["Right HipX", "Right HipY"]] = data["Right Hip"].str.split(",", expand=True)
# data[["Left HipX", "Left HipY"]] = data["Left Hip"].str.split(",", expand=True)
#
# data[["Right KneeX", "Right KneeY"]] = data["Right Knee"].str.split(",", expand=True)
# data[["Left KneeX", "Left KneeY"]] = data["Left Knee"].str.split(",", expand=True)
#
# data[["Right AnkleX", "Right AnkleY"]] = data["Right Ankle"].str.split(",", expand=True)
# data[["Left AnkleX", "Left AnkleY"]] = data["Left Ankle"].str.split(",", expand=True)
#
# data.drop(["Nose"], inplace=True, axis=1)
# data.drop(["Right Eye"], inplace=True, axis=1)
# data.drop(["Left Eye"], inplace=True, axis=1)
# data.drop(["Right Ear"], inplace=True, axis=1)
# data.drop(["Left Ear"], inplace=True, axis=1)
# data.drop(["Right Shoulder"], inplace=True, axis=1)
# data.drop(["Left Shoulder"], inplace=True, axis=1)
# data.drop(["Right Elbow"], inplace=True, axis=1)
# data.drop(["Left Elbow"], inplace=True, axis=1)
# data.drop(["Right Wrist"], inplace=True, axis=1)
# data.drop(["Left Wrist"], inplace=True, axis=1)
# data.drop(["Right Hip"], inplace=True, axis=1)
# data.drop(["Left Hip"], inplace=True, axis=1)
# data.drop(["Right Knee"], inplace=True, axis=1)
# data.drop(["Left Knee"], inplace=True, axis=1)
# data.drop(["Right Ankle"], inplace=True, axis=1)
# data.drop(["Left Ankle"], inplace=True, axis=1)
#--------------------------------------------------------------------------------------------------

#print(data["Right AnkleX"])
# Convert data from string values to float
data = data.astype(np.float32)
#target = data.astype(np.float32)
#print(data["Right AnkleX"])

# for i in range(34):
#     res = isinstance(data.iloc[10, i], str)
#     print("Is variable a string ? : " + str(res))
# Convert dataset to numpy to allow easier reshaping
data = pd.DataFrame(data).to_numpy()
target = pd.DataFrame(target).to_numpy()
#print("Converted to np: ", data)


# ------------------------------------------------------------
# DATA NORMALIZATION

#data = data / np.amax(data)
#target = target / 3  # 3+1 is number of possible exercises
data = sklearn.preprocessing.minmax_scale(data)  # Normalizes data. NOT target since its categorical.
#target = sklearn.preprocessing.minmax_scale(target)

#data = sklearn.preprocessing.normalize(data, norm="l1")
#target = sklearn.preprocessing.normalize(target, norm="l1")

# print(data[0])
# print("Data: \n", data)
# print("DATA DTYPE: ", data.dtype)
# print("TARGET DTYPE: ", target.dtype)
data = array(data).reshape(nSeq, nFrames, 34)  # Reshape 2D - 3D to get time steps(number of frames) into array

# ______________________________________________Model Training________________________________________________________
# Split data into test and training
x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=4)
# print("Data: \n", data)
# print("Data shape; ", data.shape)
# print("Target: \n", target)
# print("Target shape: ", target.shape)
# ------------------------------------------------------------

# -------------------------------------------------------------------------------
# RNN MODEL 1

# model = Sequential()
# model.add(LSTM(50, activation='relu', input_shape=(5, 34)))
# model.add(Dense(1))
# model.compile(optimizer='adam', loss='mse')
# history = model.fit(data, target, epochs=1000, validation_split=0.2, verbose=1)
#-------------------------------------------------------------------------------




# -------------------------------------------------------------------------------
# MODEL 2

# batch_input_shape=(a, b, c)
# a: Set to None if we don't know the number of inputs in our data
# b: Length of input sequence, Set to None for variable size inputs
# c: Length of each vector
# return_sequences  TRUE will return output after every node
#                   FALSE will return just one output at the last node
# model = Sequential()
#
# model.add(LSTM(1, batch_input_shape=(None, 5, 34), return_sequences=True))  # 1 is ouput size
# model.add(LSTM(1, return_sequences=False))
#
# model.compile(loss='mean_absolute_error', optimizer='adam', metrics=['accuracy'])
# model.summary()
#
# history = model.fit(x_train, y_train, epochs=400, validation_data=(x_test, y_test))
# results = model.predict(x_test)
# plt.scatter(range(results.size), results, c='b')
# plt.scatter(range(results.size), y_test, c='g')
# plt.show()
# #
# plt.plot(history.history['loss'])
# plt.show()
# -------------------------------------------------------------------------------

# -------------------------------------------------------------------------------
# MODEL 3
# model = Sequential()
# model.add(LSTM(200, activation='relu', return_sequences=True, input_shape=(5, 34)))
# model.add(LSTM(100, activation='relu', return_sequences=True))
# model.add(LSTM(50, activation='relu', return_sequences=True))
# model.add(LSTM(25, activation='relu'))
# model.add(Dense(20, activation='relu'))
# model.add(Dense(10, activation='relu'))
# model.add(Dense(1))
# model.compile(loss='mse',optimizer='adam', metrics=['accuracy'])
#
# history = model.fit(x_train, y_train, epochs=1000, validation_data=(x_test, y_test))
#
# results = model.predict(x_test, verbose=0)
# plt.scatter(range(results.size), results, c='b')
# plt.scatter(range(results.size), y_test, c='g')
# plt.show()
# #
# plt.plot(history.history['loss'])
# plt.show()
# -------------------------------------------------------------------------------

# -------------------------------------------------------------------------------
# MODEL 4
# model = Sequential()
# model.add(LSTM(200, activation='relu', return_sequences=True, input_shape=(5, 34)))
# model.add(LSTM(100, activation='relu', return_sequences=True))
# model.add(LSTM(50, activation='relu', return_sequences=True))
# model.add(LSTM(25, activation='relu'))
# model.add(Dense(20, activation='relu'))
# model.add(Dense(10, activation='relu'))
# model.add(Dense(1))
# model.compile(loss='mean_absolute_error', optimizer='adam', metrics=['accuracy'])
#
# history = model.fit(x_train, y_train, epochs=800, validation_data=(x_test, y_test))
#
# results = model.predict(x_test, verbose=0)
# plt.scatter(range(results.size), results, c='b')
# plt.scatter(range(results.size), y_test, c='g')
# plt.show()
# #
# plt.plot(history.history['loss'])
# plt.show()
# -------------------------------------------------------------------------------

# -------------------------------------------------------------------------------
# MODEL 5
# model.compile(loss='SparseCategoricalCrossentropy', optimizer='sgd', metrics=['accuracy'])

#print("length: ", len(data[0:10, :]))
#print(data)


# -------------------------------------------------------------------------------
# MODEL 5
model = Sequential()
model.add(LSTM(200, activation='relu', return_sequences=True, input_shape=(nFrames, 34)))
model.add(LSTM(100, activation='relu', return_sequences=True))
model.add(LSTM(50, activation='relu', return_sequences=True))
model.add(LSTM(25, activation='relu'))
model.add(Dense(20, activation='relu'))
model.add(Dense(10, activation='relu'))
model.add(Dense(4, activation='softmax'))
# model.add(Dense(1)) #- replace with soft for better anomaly detection

# Can use mse or mean_absolute_error instead of crossentrophy
model.compile(loss="sparse_categorical_crossentropy", optimizer='adam', metrics=['accuracy'])

start_time = time.time()
history = model.fit(x_train, y_train, epochs=250, validation_data=(x_test, y_test))
print("Fit time: %0.2f seconds" % (time.time() - start_time))

results = model.predict(x_test, verbose=0)
np.set_printoptions(suppress=True)
# -------------------------------------------------------------------------------
# PREDICTION
# print("1: ", data[0:1, :, :])
# print("2: ", data[1:2, :, :])
# print("3: ", data[0:2, :, :])
start_time = time.time()

# Predict on first sequence ONLY
# test_output = model.predict(data[0:1, :, :], verbose=0)

# Predict on all sequences
test_output = model.predict(data, verbose=0)
print("Prediction time: %0.3f seconds" % (time.time() - start_time))
print("Prediction: ", test_output)
# -------------------------------------------Saving & Exporting Model------------------------------------------------
# model.save('saved_model/my_model')
