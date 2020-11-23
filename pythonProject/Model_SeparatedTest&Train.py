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

# --------------------------------------------------------------------------------
# DATA PREPARATION

x_train = pd.read_csv('train_5frames_SortedPoseDataSet.csv')
x_test = pd.read_csv('test_5frames_SortedPoseDataSet.csv')

x_train["exercise"].replace({"ClamShells": 0, "GluteBridge": 1, "SingleLegDeadlift": 2, "Squat": 3}, inplace=True)
y_train = x_train["exercise"]

x_test["exercise"].replace({"ClamShells": 0, "GluteBridge": 1, "SingleLegDeadlift": 2, "Squat": 3}, inplace=True)
y_test = x_test["exercise"]

nFrames = np.amax(x_train["Frame Number"]) + 1  # Length of frames pr. Sequences.

y_train = y_train[0::nFrames]  # Splits target into the total number of sequences
y_test = y_test[0::nFrames]  # Splits target into the total number of sequences

train_nSeq = len(y_train)  # Total number of sequences
test_nSeq = len(y_test)  # Total number of sequences

# Remove the columns we don't need.
# Drop all unnecessary data columns
x_train.drop(["exercise"], inplace=True, axis=1)
x_train.drop(["File Path"], inplace=True, axis=1)
x_train.drop(["FolderID"], inplace=True, axis=1)
x_train.drop(["Frame Number"], inplace=True, axis=1)
x_train.drop(x_train.columns[0], inplace=True, axis=1)  # Remove the mystery first column

x_test.drop(["exercise"], inplace=True, axis=1)
x_test.drop(["File Path"], inplace=True, axis=1)
x_test.drop(["FolderID"], inplace=True, axis=1)
x_test.drop(["Frame Number"], inplace=True, axis=1)
x_test.drop(x_test.columns[0], inplace=True, axis=1)  # Remove the mystery first column


columns = list(x_train)
for i in columns:
    x_train[[i + "X", i + "Y"]] = x_train[[i][0]].str.split(",", expand=True)
    # print(data[[i + "X", i + "Y"]])
    x_train.drop([i], inplace=True, axis=1)


# Convert data from string values to float
x_train = x_train.astype(np.float32)

columns = list(x_test)
for i in columns:
    x_test[[i + "X", i + "Y"]] = x_test[[i][0]].str.split(",", expand=True)
    # print(data[[i + "X", i + "Y"]])
    x_test.drop([i], inplace=True, axis=1)


# Convert data from string values to float
x_test = x_test.astype(np.float32)

# Convert dataset to numpy to allow easier reshaping
x_train = pd.DataFrame(x_train).to_numpy()
y_train = pd.DataFrame(y_train).to_numpy()
x_test = pd.DataFrame(x_test).to_numpy()
y_test = pd.DataFrame(y_test).to_numpy()
#print("Converted to np: ", data)

# ------------------------------------------------------------
# DATA NORMALIZATION

#data = data / np.amax(data)
#target = target / 3  # 3+1 is number of possible exercises
x_train = sklearn.preprocessing.minmax_scale(x_train)  # Normalize data. NOT target since its categorical.
x_test = sklearn.preprocessing.minmax_scale(x_test)  # Normalize data. NOT target since its categorical.
#target = sklearn.preprocessing.minmax_scale(target)

#data = sklearn.preprocessing.normalize(data, norm="l1")
#target = sklearn.preprocessing.normalize(target, norm="l1")

# print(data[0])
# print("Data: \n", data)
# print("DATA DTYPE: ", data.dtype)
# print("TARGET DTYPE: ", target.dtype)
print("x_train: ", train_nSeq, x_train.shape)
print("x_test: ", test_nSeq, x_test.shape)

x_train = array(x_train).reshape(train_nSeq, nFrames, 34)  # Reshape 2D - 3D to get time steps(number of frames) into array
x_test = array(x_test).reshape(test_nSeq, nFrames, 34)  # Reshape 2D - 3D to get time steps(number of frames) into array

# ------------------------------------------------------------
# MODEL TRAINING

# Split data into test and training
# x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=4)
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
plt.plot(history.history['loss'])
plt.show()
# -------------------------------------------------------------------------------
# PREDICTION
# print("1: ", data[0:1, :, :])
# print("2: ", data[1:2, :, :])
# print("3: ", data[0:2, :, :])
start_time = time.time()

# Predict on first sequence ONLY
# test_output = model.predict(data[0:1, :, :], verbose=0)

# Predict on all sequences
test_output = model.predict(x_test, verbose=0)
print("Prediction time: %0.3f seconds" % (time.time() - start_time))
print("Prediction: ", test_output)
# -------------------------------------------Saving & Exporting Model------------------------------------------------
# model.save('saved_model/my_model')
