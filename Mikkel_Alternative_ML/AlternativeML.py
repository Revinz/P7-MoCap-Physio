# Source: https://www.datacamp.com/community/tutorials/svm-classification-scikit-learn-python
from sklearn import datasets  # Sklearn dataset library + support
from sklearn.model_selection import train_test_split  # Import train_test_split function
from sklearn import svm  # SVM model
from sklearn import metrics  # Module for accuracy calculation

# Load SK dataset
cancer = datasets.load_breast_cancer()  # Change to .wine   for alternative dataset

# print the names of the 13 features
print("Features: ", cancer.feature_names)

# print the label type of cancer('malignant' 'benign')
print("Labels: ", cancer.target_names)

# print data(feature)shape
print(cancer.data.shape)

# Print specific data entries
print(cancer.data[0:5])

# print the cancer labels (0:malignant, 1:benign)
print(cancer.target)

# Split dataset into training set and test set
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, test_size=0.3, random_state=109)
# 70% training and 30% test

# Create a svm Classifier
# (C=1.0, kernel='', degree=3, gamma='scale', coef0=0.0, shrinking=True, probability=False, tol=0.001, cache_size=200,
# (..)class_weight=None, verbose=False, max_iter=-1, decision_function_shape='ovr', break_ties=False, random_state=None)
clf = svm.SVC(C=1000, kernel='linear', random_state=10)  # Add & change above parameters for different results

# Train the model using the training sets
clf.fit(X_train, y_train)
print("fit status is:", clf.fit_status_)  # Gives 0 if correct, 1 if incorrect.

# Predict the response for test dataset
y_pred = clf.predict(X_test)

# Model Accuracy: how often is the classifier correct?
print("Accuracy:", metrics.accuracy_score(y_test, y_pred))

#------------------------------Outdated------------------------#
#n_samples = #Number of samples
#n_features = #Number of features
#n_labels = #Number of sample labels
#X = [[n_samples], [n_features]]
#y = [n_labels], [n_samples]
#clf = svm.SVC()
#clf.fit(X, y)
#svm.SVC()

#clf.predict([[2., 2.]])
#array([1])
