// Send a message to devices subscribed to the provided topic.
const admin = require("firebase-admin");
const creds = require("./p7physio-firebase-adminsdk.json");
const dotenv = require("dotenv");
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(creds),
  databaseURL: process.env.DATABASE_URL,
});

const database = admin.database();

const topic = "P7";

const getDeviceToken = async (uid) => {
  const ref = database.ref("/participants/" + uid);
  const result = await ref.once("value");
  return result.val().token;
};

const SendData = async (req, action) => {
  const data = {
    ID: req.query.id,
    testtype: req.query.type,
    action: action,
    params: JSON.stringify(req.params),
  };
  const token = await getDeviceToken(req.query.id);
  console.log(token);
  const message = {
    data,
    android: {
      priority: "high",
    },
    token: token,
  };

  //Sends the message
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

module.exports = SendData;
