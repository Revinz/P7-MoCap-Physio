from keras.models import Sequential
# from keras.layers import Dense
from keras.layers import LSTM
from sklearn.model_selection import train_test_split
import numpy as np
import matplotlib.pyplot as plt
from keras.models import Sequential
# from keras.layers import Dense
from keras.layers import LSTM
from sklearn.model_selection import train_test_split
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from numpy import array

from keras.layers.core import Activation, Dropout, Dense

from keras.preprocessing.text import one_hot
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers import Flatten, LSTM
from keras.layers import GlobalMaxPooling1D
from keras.models import Model
from keras.layers.embeddings import Embedding
from sklearn.model_selection import train_test_split
from keras.preprocessing.text import Tokenizer
from keras.layers import Input
from keras.layers.merge import Concatenate
from keras.layers import Bidirectional

# Data preparation
data = pd.read_csv('SortedPoseDataSet.csv')  # Reads the file & sorts data into columns
# for i in range(6):
#    print("DATA FOR ROW", i, data.iloc[i, 18])  # Prints row 0-6, column 18 to see if it matches excel

# -------------ATTEMPT 2, Prints out the same data, no way to see if its actually seperated into time series-------------
# https://stackabuse.com/solving-sequence-problems-with-lstm-in-keras/
# data.values.reshape(-1,5,1)
# for i in range(6):
#     print("data: ", data.iloc[i,1])
# --------------------------------------------------------END OF ATTEMPT------------------------------------------------


data["exercise"].replace({"ClamShells": 0, "GluteBridge": 1, "SingleLegDeadlift": 2, "Squat": 3}, inplace=True)

target = data["exercise"]  # Extracts only the target for later prediction
target = target[0:900:5]

#res = type(target) == str
# print result
#print("Is variable a string ? : " + str(res))

# Remove the columns we don't need.
data.drop(["exercise"], inplace=True, axis=1)
data.drop(["File Path"], inplace=True, axis=1)
data.drop(["FolderID"], inplace=True, axis=1)
data.drop(["Frame Number"], inplace=True, axis=1)
data.drop(data.columns[0], inplace=True, axis=1) # Remove the mystery first column
#print("dtypes: ", data.dtypes)
#print("sorted data:  ", data)

#--------------------------------------------------------------------------------------------------
#

data[["noseX", "noseY"]] = data.Nose.str.split(",", expand=True)

data[["Right EyeX", "Right EyeY"]] = data["Right Eye"].str.split(",", expand=True)
data[["Left EyeX", "Left EyeY"]] = data["Left Eye"].str.split(",", expand=True)

data[["Right EarX", "Right EarY"]] = data["Right Ear"].str.split(",", expand=True)
data[["Left EarX", "Left EarY"]] = data["Left Ear"].str.split(",", expand=True)

data[["Right ShoulderX", "Right ShoulderY"]] = data["Right Shoulder"].str.split(",", expand=True)
data[["Left ShoulderX", "Left ShoulderY"]] = data["Left Shoulder"].str.split(",", expand=True)

data[["Right ElbowX", "Right ElbowY"]] = data["Right Elbow"].str.split(",", expand=True)
data[["Left ElbowX", "Left ElbowY"]] = data["Left Elbow"].str.split(",", expand=True)

data[["Right WristX", "Right WristY"]] = data["Right Wrist"].str.split(",", expand=True)
data[["Left WristX", "Left WristY"]] = data["Left Wrist"].str.split(",", expand=True)

data[["Right HipX", "Right HipY"]] = data["Right Hip"].str.split(",", expand=True)
data[["Left HipX", "Left HipY"]] = data["Left Hip"].str.split(",", expand=True)

data[["Right KneeX", "Right KneeY"]] = data["Right Knee"].str.split(",", expand=True)
data[["Left KneeX", "Left KneeY"]] = data["Left Knee"].str.split(",", expand=True)

data[["Right AnkleX", "Right AnkleY"]] = data["Right Ankle"].str.split(",", expand=True)
data[["Left AnkleX", "Left AnkleY"]] = data["Left Ankle"].str.split(",", expand=True)

data.drop(["Nose"], inplace=True, axis=1)
data.drop(["Right Eye"], inplace=True, axis=1)
data.drop(["Left Eye"], inplace=True, axis=1)
data.drop(["Right Ear"], inplace=True, axis=1)
data.drop(["Left Ear"], inplace=True, axis=1)
data.drop(["Right Shoulder"], inplace=True, axis=1)
data.drop(["Left Shoulder"], inplace=True, axis=1)
data.drop(["Right Elbow"], inplace=True, axis=1)
data.drop(["Left Elbow"], inplace=True, axis=1)
data.drop(["Right Wrist"], inplace=True, axis=1)
data.drop(["Left Wrist"], inplace=True, axis=1)
data.drop(["Right Hip"], inplace=True, axis=1)
data.drop(["Left Hip"], inplace=True, axis=1)
data.drop(["Right Knee"], inplace=True, axis=1)
data.drop(["Left Knee"], inplace=True, axis=1)
data.drop(["Right Ankle"], inplace=True, axis=1)
data.drop(["Left Ankle"], inplace=True, axis=1)
#--------------------------------------------------------------------------------------------------

data[] = pd.to_numeric(data)

for i in range(34):
    res = isinstance(data.iloc[10, i], str)
    print("Is variable a string ? : " + str(res))

data = pd.DataFrame(data).to_numpy()
target = pd.DataFrame(target).to_numpy()
#print("Converted to np: ", data)

#print("Data: \n", data)
print("DATA DTYPE: ", data.dtype)
print("TARGET DTYPE: ", target.dtype)

data = array(data).reshape(180, 5, 34)
#print("Data: \n", data)
#print("Data shape; ", data.shape)
#print("Target: \n", target)
#print("Target shape: ", target.shape)
# Split data into test and training
x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=4)

# # RNN model
#model = Sequential()

# None is set if we don't know the number of inputs in our data
# 5 is length of input sequence, Set to None for variable size inputs
# 17 is length of each vector
# return_sequences  TRUE will return output after every node
#                   FALSE will return just one output at the last node

# 1 is ouput size
# model.add(LSTM((1),batch_input_shape=(None, 5, 17), return_sequences=True))
# model.add(LSTM((1),return_sequences=False))
# #
# model.compile(loss='mean_absolute_error', optimizer='adam', metrics=['accuracy'])
# model.summary()
# history = model.fit(x_train, y_train, epochs=400, validation_data=(x_test, y_test))
#

model = Sequential()
model.add(LSTM(50, activation='relu', input_shape=(5, 34)))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')
history = model.fit(data, target, epochs=1000, validation_split=0.2, verbose=1)

# results = model.predict(x_test)
# plt.scatter(range(20), results, c='b')
# plt.scatter(range(20), y_test, c='g')
# plt.show()
# #
# plt.plot(history.history['loss'])
# plt.show()