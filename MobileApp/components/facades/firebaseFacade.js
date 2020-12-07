import firebase from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";
import database from "@react-native-firebase/database";

const config = {
  databaseURL:
    "https://p7physio-default-rtdb.europe-west1.firebasedatabase.app",
  project_id: "p7physio",
};
if (!firebase.apps.length) firebase.initializeApp(config);

const db = firebase.database();
console.log(db)
console.log(firebase.app.options)
db.setPersistenceEnabled(true);

export const UpdateParticipantToken = (uid) => {
  //Overwrite existing or create new entry for the user if they don't exist in the DB
  const ref = db.ref("/participants/");
  //Upload token to server
  messaging()
    .getToken()
    .then((token) => {
      console.log(token);
      ref
        .child(uid)
        .set({ token: token })
        .then(() => console.log(uid + "'s token updated."))
        .catch((err) => console.log(err));
    });
};
