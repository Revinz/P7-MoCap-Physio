// Send a message to devices subscribed to the provided topic.
const admin = require("firebase-admin");
const creds = require("./p7physio-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(creds),
  databaseURL: process.env.DATABASE_URL,
});

const topic = "P7";
const SendData = (data) => {
  const message = {
    data,
    topic: topic,
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
