const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pathToDataDirectory = "../public/Data";
const dataFilePath = path.join(pathToDataDirectory, "data.json");
const replyDataFilePath = path.join(pathToDataDirectory, "replyData.json");

app.post("/submit", (req, res) => {
  const data = req.body;
  data.id = Math.floor(Math.random() * 9000 + 1000);
  data.raisedTime = moment().tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A");

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([data], null, 2));
  } else {
    const jsonData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    jsonData.push(data);
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));
    res.send("Data saved successfully.");
  }
});

app.post("/reply", (req, res) => {
  const replyData = req.body;

  if (!fs.existsSync(replyDataFilePath)) {
    fs.writeFileSync(replyDataFilePath, JSON.stringify([replyData], null, 2));
  } else {
    const jsonData = JSON.parse(fs.readFileSync(replyDataFilePath, "utf8"));
    jsonData.push(replyData);
    fs.writeFileSync(replyDataFilePath, JSON.stringify(jsonData, null, 2));
    res.send("Reply data saved successfully.");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});