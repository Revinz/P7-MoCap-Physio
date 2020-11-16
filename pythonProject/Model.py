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
for i in range(6):
    print("DATA FOR ROW", i, data.iloc[i, 18])  # Prints row 0-6, column 18 to see if it matches excel

print("data: ", data)

target = data["exercise"]  # Extracts only the target for later prediction
print("target: ", target)

data.drop(["exercise"], inplace=True, axis=1)  # Removes both exercise & filepath columns.
data.drop(["File Path"], inplace=True, axis=1)
print("sorted data:  ", data)

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