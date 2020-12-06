// Send a message to devices subscribed to the provided topic.
const admin = require("firebase-admin");
const creds = require("./p7physio-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(creds),
  databaseURL: process.env.DATABASE_URL,
});

const topic = "P7";
const SendData = (req, action) => {
  const data = {
    ID: req.query.id,
    testtype: req.query.type,
    action: action,
  };
  const message = {
    data,
    topic: topic,
    android: {
      priority: "high",
    },
    apns: {
      payload: {
        aps: {
          contentAvailable: true,
        },
      },
      headers: {
        "apns-push-type": "background",
        "apns-priority": "5",
        "apns-topic": "", // your app bundle identifier
      },
    },
    webpush: {
      headers: {
        Urgency: "high",
      },
    },
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
