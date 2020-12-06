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
  try {
    SendData(req, "HELLO WORLD PARAMS");
  } catch (err) {
    res.status(500);
    res.send("Error while sending");
  }
  res.send(req.query);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});