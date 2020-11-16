import tensorflow as tf
import numpy as np
from PIL import Image
import pickle
import matplotlib.pyplot as plt
import cv2 as cv
import math
import time


def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.


def load_dataset():
    # Training dataset
    dataset = np.loadtxt('DatasetName.csv', delimiter=',')
    # split dataset into input (X) and output (y) variables
    x = dataset[:, 0:4]  # One input for every exercise
    y = dataset[:, 4]  # One output total


def keras_load():
    # Load mobilenet
    model = tf.keras.applications.MobileNetV2(
        input_shape=(Iwidth, Iheight, 3),  # use image dimensions & rgb
        alpha=1.0,
        include_top=False,  # Change to true if image format is 224, 224, rgb
        weights="imagenet",
        input_tensor=None,
        pooling=None,
        classes=1000,
        classifier_activation="softmax",
    )
    return model


def image_load(image):
    img = cv.imread(image, 1)
    print(img)
    Iheight, Iwidth, channels = img.shape
    print(Iheight, Iwidth, channels)
    cv.imshow('img', img)
    cv.waitKey(0)
    cv.destroyAllWindows()
    return Iwidth, Iheight, img


if __name__ == '__main__':
    Iwidth, Iheight, img = image_load('Fullbody.jpg')  # Load image
    model = keras_load() # Load model
    model.summary(line_length=None, positions=None, print_fn=None)  # Print network summary
    img.reshape(1, -1)
    print(img.shape)
    model.predict(img)

