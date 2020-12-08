const BASE_URL = "http://localhost:8080";

function participantInfo(uid, testID) {
  console.log(uid, testID);
  return "?id=" + uid + "&type=" + testID;
}

export const IncreaseReps = async (uid, testID) => {
  const response = await fetch(
    BASE_URL + "/rep/increase" + participantInfo(uid, testID)
  );
  return response.status;
};

export const SendMistake = async (uid, testID) => {
  const response = await fetch(
    BASE_URL + "/exercise/mistake" + participantInfo(uid, testID)
  );
  return response.status;
};

export const SetExercise = async (exercise, uid, testID) => {
  const response = await fetch(
    BASE_URL + "/exercise/set/" + exercise + participantInfo(uid, testID)
  );
  return response.status;
};
