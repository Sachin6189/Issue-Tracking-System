const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pathToDirectory = "../public/Data";
const dataFilePath = path.join(pathToDirectory, "data.json");

app.post("/submit", (req, res) => {
  const data = req.body;
  data.id = Math.floor(Math.random() * 9000 + 1000);
  data.raisedTime = moment().tz("Asia/Kolkata").format();

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([data], null, 2));
  } else {
    const jsonData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    jsonData.push(data);
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));
    res.send("Data saved successfully.");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
