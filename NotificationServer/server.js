const cors = require("cors");
const express = require("express");
const app = express();
const SendData = require("./MessageSender");
const dotenv = require("dotenv");
dotenv.config();
const port = 3001;
/**
 *
 *  Run using 'node server.js'
 *  then goto to the page: http://localhost:3001
 *
 *  if dev, run with 'nodemon server.js' for live-reload
 *  first do : npm install -g nodemon
 *
 */
app.use(cors());

//Start firebase

app.get("/", (req, res) => {
  res.send("The server is running!");
});

app.get("/test", (req, res) => {
  SendData(req, "HELLO WORLD PARAMS");
  res.send(req.query);
});

app.get("/increaserep", (req, res) => {
  const data = 
    { id: "test",
      testType: 0,
      action: "DECREASE_REM_REPS"
    };
  SendData(data);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
