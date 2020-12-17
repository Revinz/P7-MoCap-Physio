model.add(Bidirectional(LSTM(200, activation='tanh', return_sequences=True, input_shape=(nFrames, dataP))))
model.add(Dropout(0.3)) # Very nice dropout
model.add(Bidirectional(LSTM(100, activation='tanh', return_sequences=True, dropout=0.3)))
#model.add(Bidirectional(LSTM(50, activation='relu', return_sequences=True)))
model.add(Bidirectional(LSTM(50, activation='tanh', return_sequences=True, dropout=0.3)))
model.add(Bidirectional(LSTM(25, activation='tanh', dropout=0.3)))
model.add(Dense(68, activation='tanh'))
model.add(Dropout(0.2))
model.add(Dense(34, activation='tanh'))
model.add(Dropout(0.2))
model.add(Dense(5, activation='softmax'))

model.compile(loss="sparse_categorical_crossentropy", metrics=['accuracy'], optimizer='adam')

start_time = time.time()
history = model.fit(x_train, y_train, epochs=100, validation_data=(x_test, y_test), batch_size=train_nSeq)