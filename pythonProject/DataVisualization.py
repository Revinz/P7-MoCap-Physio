import numpy as np
import pandas as pd
from numpy import array
import time
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt
import seaborn as sns

# Data preparation
data = pd.read_csv('SortedPoseDataSet.csv')  # Reads the file & sorts data into columns
data["exercise"].replace({"ClamShells": 0, "GluteBridge": 1, "SingleLegDeadlift": 2, "Squat": 3}, inplace=True)
target = data["exercise"]  # Extracts only the target for later prediction
target = target[0:900:5]

# Remove the columns we don't need.
data.drop(["exercise"], inplace=True, axis=1)
data.drop(["File Path"], inplace=True, axis=1)
data.drop(["FolderID"], inplace=True, axis=1)
data.drop(["Frame Number"], inplace=True, axis=1)
data.drop(data.columns[0], inplace=True, axis=1) # Remove the mystery first column

columns = list(data)
for i in columns:
    data[[i + "X", i + "Y"]] = data[[i][0]].str.split(",", expand=True)
    print(data[[i + "X", i + "Y"]])
    data.drop([i], inplace=True, axis=1)

# Arrange data
data = data.astype(np.float32)
data = pd.DataFrame(data).to_numpy()
target = pd.DataFrame(target).to_numpy()
data = array(data).reshape(180, 5, 34)
data = data / np.amax(data)
target = target / 3

# Visualize data
df = data
# Reshape into 2d array
nsamples, nx, ny = df.shape
df = df.reshape((nsamples,nx*ny))
print(df.shape)
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
