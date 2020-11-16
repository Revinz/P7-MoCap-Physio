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

# Data preparation
data = pd.read_csv('PoseDataset.csv')  # Reads the file & sorts data into columns
#for i in range(6):
#    print("DATA FOR ROW", i, data.iloc[i, 18])  # Prints row 0-6, column 18 to see if it matches excel

#-------------ATTEMPT 2, Prints out the same data, no way to see if its actually seperated into time series-------------
# https://stackabuse.com/solving-sequence-problems-with-lstm-in-keras/
# data.values.reshape(-1,5,1)
# for i in range(6):
#     print("data: ", data.iloc[i,1])
#--------------------------------------------------------END OF ATTEMPT------------------------------------------------

target = data["exercise"]  # Extracts only the target for later prediction
print("target: ", target)

data.drop(["exercise"], inplace=True, axis=1)  # Removes both exercise & filepath columns.
data.drop(["File Path"], inplace=True, axis=1)
print("sorted data:  ", data)

#-----------ATTEMPT 1, Works with target but not the 17 body joint samples--------------------------------------------
#https://machinelearningmastery.com/how-to-develop-lstm-models-for-time-series-forecasting/
# split a univariate sequence into samples -ISSUE: 17 body joint variables are NOT univariate.
# def split_sequence(sequence, n_steps):
#     X = data
#     y = target
#     X, y = list(), list()
#     for i in range(len(sequence)):
#         # find the end of this pattern
#         end_ix = i + n_steps
#         # check if we are beyond the sequence
#         if end_ix > len(sequence)-1:
#             break
#         # gather input and output parts of the pattern
#         seq_x, seq_y = sequence[i:end_ix], sequence[end_ix]
#         X.append(seq_x)
#         y.append(seq_y)
#     return list(X), list(y)
#
# X, y = split_sequence(data, 5)
# print(X, y)
#------------------------------------END OF ATTEMPT-------------------------

# Split data into test and training
#x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=4)

# # RNN model
#model = Sequential()
#
# # None is set if we don't know the number of inputs in our data
# # 5 is length of input sequence, Set to None for variable size inputs
# # 1 is length of each vector
# # return_sequences  TRUE will return output after every node
# #                   FALSE will return just one output at the last node
#
# # 1 is ouput size
# model.add(LSTM((1),batch_input_shape=(None, 5, 1), return_sequences=True))
# model.add(LSTM((1),return_sequences=False))
# #
# model.compile(loss='mean_absolute_error', optimizer='adam', metrics=['accuracy'])
# model.summary()
# history = model.fit(x_train, y_train, epochs=400, validation_data=(x_test, y_test))
# #
# results = model.predict(x_test)
# plt.scatter(range(20), results, c='b')
# plt.scatter(range(20), y_test, c='g')
# plt.show()
# #
# plt.plot(history.history['loss'])
# plt.show()