import sklearn
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from numpy import array
from keras.models import Sequential
from keras.layers import Flatten, LSTM, Dropout
from keras.layers.core import Dense
from keras.layers import Bidirectional
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import minmax_scale
import time
import seaborn as sns


import numpy as np
import pandas as pd
from numpy import array
import time
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt
import seaborn as sns


from numpy.random import seed
from tensorflow import optimizers

seed(1)

def visualizeData():
    # Arrange data
    data = x_train.astype(np.float32)
    data = pd.DataFrame(data).to_numpy()
    target = pd.DataFrame(y_train).to_numpy()
    data = array(data).reshape(train_nSeq, nFrames, 34)
    data = data / np.amax(data)
    target = target / 3  # 3+1 is number of possible exercises
    # Visualize data
    df = data
    # Reshape into 2d array
    nsamples, nx, ny = df.shape
    df = df.reshape((nsamples, nx*ny))
    print(df.shape)
    # ______________________________________________Dimensionality Reduction________________________________________
    # PCA
    pca = PCA(n_components=3)
    pca_result = pca.fit_transform(df)
    PCA1 = pca_result[:, 0]
    PCA2 = pca_result[:, 1]
    PCA3 = pca_result[:, 2]
    print('Explained variation per principal component: {}'.format(pca.explained_variance_ratio_))
    # PCA 3D
    ax = plt.figure(figsize=(16, 10)).gca(projection='3d')
    ax.scatter(xs=PCA1, ys=PCA2, zs=PCA3, c=target[:, 0], cmap='tab10')
    ax.set_xlabel('pca-one')
    ax.set_ylabel('pca-two')
    ax.set_zlabel('pca-three')
    plt.show()
    # TSNE 2D
    time_start = time.time()
    tsne = TSNE(n_components=2, verbose=1, perplexity=40, n_iter=300, random_state=1) # Remove r_state for diverse results
    tsne_results = tsne.fit_transform(df)
    print('t-SNE done! Time elapsed: {} seconds'.format(time.time()-time_start))
    TSNE1 = tsne_results[:, 0]
    TSNE2 = tsne_results[:, 1]
    # -----------------Data Plotting
    plt.figure(figsize=(16, 7))
    ax1 = plt.subplot(1, 2, 1)
    sns.scatterplot(
        x=PCA1, y=PCA2, hue=target[:, 0], palette=sns.color_palette("hls", 4), data=df, legend="full", alpha=1, ax=ax1)
    ax2 = plt.subplot(1, 2, 2)
    sns.scatterplot(
        x=TSNE1, y=TSNE2, hue=target[:,0], palette=sns.color_palette("hls", 4), data=df, legend="full", alpha=1, ax=ax2)
    plt.show()

# --------------------------------------------------------------------------------
# DATA PREPARATION

x_train = pd.read_csv('training_5ex_10fram_2skip_Sorted.csv')
x_test = pd.read_csv('test_5ex_10fram_2skip_Sorted.csv')

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

columns = list(x_test)
for i in columns:
    x_test[[i + "X", i + "Y"]] = x_test[[i][0]].str.split(",", expand=True)
    # print(data[[i + "X", i + "Y"]])
    x_test.drop([i], inplace=True, axis=1)




# Convert data from string values to float
x_train = x_train.astype(np.float32)
x_test = x_test.astype(np.float32)




# ---------------------------------------------------------------------------
#print("x-test", x_test, x_test.shape)

#x_test.iloc[1, :] = x_test.iloc[2, :]
#print(x_test.iloc[0, :])
#print(x_test.iloc[1, :])
#print(x_test.iloc[2, :])

train_rowsToDrop = []
test_rowsToDrop = []

for i in range(train_nSeq * nFrames - 1):
    #print(i % nFrames)
    if i % nFrames == nFrames - 1:
        train_rowsToDrop.append(i)

    else:
        x_train.iloc[i, :] = x_train.iloc[i+1, :] - x_train.iloc[i, :]

for i in range(test_nSeq * nFrames - 1):
    if i % nFrames == nFrames - 1:
        test_rowsToDrop.append(i)
    else:
        x_test.iloc[i, :] = x_test.iloc[i+1, :] - x_test.iloc[i, :]


for i in range(train_nSeq * nFrames):
    if i % nFrames == 0:
        continue
    else:
        x_train.iloc[i, :] = abs(x_train.iloc[i, :]) + abs(x_train.iloc[i-1, :])

for i in range(test_nSeq * nFrames):
    if i % nFrames == 0:
        continue
    else:
        x_test.iloc[i, :] = abs(x_test.iloc[i, :]) + abs(x_test.iloc[i-1, :])


#visualizeData()

print("Rows to drop: ", train_rowsToDrop)
print("Rows to drop: ", len(train_rowsToDrop))
print("Not dropped: ", x_train)
x_train.drop(train_rowsToDrop, 0, inplace=True)
print("Head: ", x_train.head(20))

print("Dropped: ", x_train)

x_test.drop(test_rowsToDrop, 0, inplace=True)
print("Head: ", x_test.head(20))
x_train.drop(index=len(x_train)-1, inplace=True)
x_test.drop(index=len(x_test)-1, inplace=True)
print("træn:", x_test, len(x_test))
# ---------------------------------------------------------------------------


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

#y_train = sklearn.preprocessing.minmax_scale(y_train)  # Normalize data. NOT target since its categorical.
#y_test = sklearn.preprocessing.minmax_scale(y_test)  # Normalize data. NOT target since its categorical.
#target = sklearn.preprocessing.minmax_scale(target)

#data = sklearn.preprocessing.normalize(data, norm="l1")
#target = sklearn.preprocessing.normalize(target, norm="l1")

# print(data[0])
# print("Data: \n", data)
# print("DATA DTYPE: ", data.dtype)
# print("TARGET DTYPE: ", target.dtype)
print("x_train: ", train_nSeq, x_train.shape)
print("x_test: ", test_nSeq, x_test.shape)

x_train = array(x_train).reshape(train_nSeq, nFrames-1, 34)  # Reshape 2D - 3D to get time steps(number of frames) into array
x_test = array(x_test).reshape(test_nSeq, nFrames-1, 34)  # Reshape 2D - 3D to get time steps(number of frames) into array

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
# model = Sequential()
# model.add(LSTM(100, activation='relu', return_sequences=True, input_shape=(nFrames, 34)))
# model.add(LSTM(50, activation='relu', return_sequences=True))
# model.add(LSTM(25, activation='relu', return_sequences=True))
# model.add(LSTM(20, activation='relu'))
# model.add(Dense(40, activation='relu'))
# model.add(Dense(20, activation='relu'))
# model.add(Dense(4, activation='softmax'))
# model.compile(loss='SparseCategoricalCrossentropy', optimizer='sgd', metrics=['accuracy'])
#print("length: ", len(data[0:10, :]))
#print(data)


# -------------------------------------------------------------------------------
# MODEL 6
# model = Sequential()
# #model.add(Dropout(0.25))
# model.add(Bidirectional(LSTM(400, activation='relu', return_sequences=True, input_shape=(nFrames, 34))))
# #model.add(Dropout(0.5))
# model.add(Bidirectional(LSTM(200, activation='relu', return_sequences=True)))
# #model.add(Bidirectional(LSTM(50, activation='relu', return_sequences=True)))
# #model.add(Dropout(0.5))
# model.add(Bidirectional(LSTM(100, activation='relu', return_sequences=True)))
# #model.add(Dropout(0.5))
# model.add(Bidirectional(LSTM(50, activation='relu')))
# #model.add(Dropout(0.3))
# model.add(Dense(80, activation='relu'))
# #model.add(Dropout(0.5))
# model.add(Dense(40, activation='relu'))
# #model.add(Dropout(0.5))
# model.add(Dense(4, activation='softmax'))
# #model.add(Dense(1)) #- replace with soft for better anomaly detection
#
# # Can use mse or mean_absolute_error instead of crossentrophy
# #model.compile(loss="mean_absolute_error", optimizer='adam', metrics=['accuracy'])
# model.compile(loss="sparse_categorical_crossentropy", optimizer='adam', metrics=['accuracy'])

# -------------------------------------------------------------------------------
# MODEL 7
# model = Sequential()
# #model.add(Dropout(0.1))
# model.add(LSTM(512, activation='relu', return_sequences=True, input_shape=(nFrames, 34)))
# model.add(LSTM(256, activation='relu', return_sequences=True))
# model.add(LSTM(128, activation='relu', return_sequences=True))
# model.add(LSTM(64, activation='relu', return_sequences=True))
# model.add(LSTM(32, activation='relu', return_sequences=True))
# model.add(LSTM(16, activation='relu', return_sequences=True))
# model.add(LSTM(8, activation='relu'))
#
# #model.add(Dropout(0.25))
# model.add(Dense(8, activation='relu'))
# #model.add(Dropout(0.5))
# model.add(Dense(4, activation='relu'))
# #model.add(Dropout(0.5))
# model.add(Dense(4, activation='softmax'))
# # model.add(Dense(1)) #- replace with soft for better anomaly detection
#
# # Can use mse or mean_absolute_error instead of crossentrophy
# model.compile(loss="sparse_categorical_crossentropy", optimizer='adam', metrics=['accuracy'])

print(nFrames)
# -------------------------------------------------------------------------------
# MODEL 7
model = Sequential()
#model.add(Dropout(0.1))
model.add(LSTM(100, activation='tanh', return_sequences=True, input_shape=(nFrames-1, 34), dropout=0.5))
#model.add(LSTM(256, activation='relu', return_sequences=True))
model.add(LSTM(75, activation='relu', return_sequences=True, dropout=0.5))
model.add(LSTM(50, activation='relu', return_sequences=True, dropout=0.5))
model.add(LSTM(20, activation='relu', dropout=0.5))

#model.add(Dropout(0.25))
model.add(Dense(40, activation='relu'))
#model.add(Dropout(0.25))
model.add(Dense(20, activation='relu'))
#model.add(Dropout(0.25))
model.add(Dense(4, activation='softmax'))
# model.add(Dense(1)) #- replace with soft for better anomaly detection

opt = optimizers.Adam(learning_rate=0.0005)
# Can use mse or mean_absolute_error instead of crossentropy
model.compile(loss='sparse_categorical_crossentropy', optimizer=opt, metrics=['accuracy'])

start_time = time.time()
history = model.fit(x_train, y_train, epochs=1500, validation_data=(x_test, y_test))
print("Fit time: %0.2f seconds" % (time.time() - start_time))

results = model.predict(x_test, verbose=0)
np.set_printoptions(suppress=True)

resultIndex = []
for e in results:
    i = np.argmax(e)
    resultIndex.append(i)

plt.scatter(range(len(resultIndex)), y_test, c='g')
plt.scatter(range(len(resultIndex)), resultIndex, c='b', marker='x')
plt.show()

# plt.scatter(range(results.size), results, c='b')
# plt.scatter(range(results.size), y_test, c='g')


plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('model accuracy')
plt.ylabel('accuracy')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
plt.show()
# summarize history for loss
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('model loss')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
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

