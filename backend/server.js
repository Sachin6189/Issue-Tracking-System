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



// const express = require('express');
// const mysql = require('mysql');

// const app = express();

// // MySQL Connection Configuration
// const db = mysql.createConnection({
//   host: 'your_mysql_host',
//   user: 'your_mysql_user',
//   password: 'your_mysql_password',
//   database: 'your_database_name'
// });

// // Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// // Close the MySQL connection when the Node.js process is terminated
// process.on('SIGINT', () => {
//   db.end((err) => {
//     if (err) {
//       console.error('Error closing MySQL connection:', err);
//       process.exit(1);
//     }
//     console.log('MySQL connection closed');
//     process.exit(0);
//   });
// });

// // Start the Express server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
