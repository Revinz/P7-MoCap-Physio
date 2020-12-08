const admin = require("firebase-admin");
const creds = require("./p7physio-firebase-adminsdk.json");
const dotenv = require("dotenv");
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(creds),
  databaseURL: process.env.DATABASE_URL,
});

const database = admin.database();

const getDeviceToken = async (uid) => {
  const ref = database.ref("/participants/" + uid);
  const result = await ref.once("value");
  console.log(result.val());
  return result.val().token;
};

const SendData = async (req, action) => {
  console.log(req);
  const data = {
    ID: req.query.id,
    testtype: req.query.type,
    action: action,
    params: JSON.stringify(req.params),
  };
  console.log(data);
  const token = await getDeviceToken(req.query.id).catch((err) =>
    console.log(err)
  );
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
    });
};

module.exports = SendData;
