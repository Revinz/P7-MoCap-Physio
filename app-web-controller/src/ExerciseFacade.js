const BASE_URL = "http://localhost:3001";

function participantInfo(uid, testID) {
  return `?ID=${uid}&${testID}`;
}

export const IncreaseReps = async (uid, testID) => {
  const response = await fetch(
    BASE_URL + "/rep/increase" + participantInfo(uid, testID)
  )
    .then((r) => r.json())
    .catch((err) => console.log(err));
  console.log(response);
};

// export const IncreaseSets = async (exercise, uid, testID) => {
//   const response = await fetch(
//     BASE_URL + "/set/increase/" + exercise + participantInfo(uid, testID)
//   )
//     .then((r) => r.json())
//     .catch((err) => console.log(err));
//   console.log(response);
// };

export const SetExercise = async (exercise, uid, testID) => {
  const response = await fetch(
    BASE_URL + "/exercise/set/" + exercise + participantInfo(uid, testID)
  )
    .then((r) => r.json())
    .catch((err) => console.log(err));
  console.log(response);
};
