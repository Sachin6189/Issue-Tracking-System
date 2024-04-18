const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const moment = require("moment-timezone");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "database",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(200).send("Logged in successfully.");
    } else {
      res.status(401).send("Invalid credentials.");
    }
  });
});

app.post("/submit", (req, res) => {
  const {
    selectedEmployee,
    selectedProject,
    selectedModule,
    selectedCategory,
    contact,
    issueTitle,
    description,
    imageData,
  } = req.body;

  const sql =
    "INSERT INTO tickets (employee_id, project_name, module_name, category, contact, issue_title, description, image_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      selectedEmployee.value,
      selectedProject.value,
      selectedModule.value,
      selectedCategory.value,
      contact,
      issueTitle,
      description,
      imageData,
    ],
    (err, result) => {
      if (err) throw err;
      res.status(200).send("Data sent successfully!");
    }
  );
});

// const pathToDataDirectory = "../public/Data";
// const dataFilePath = path.join(pathToDataDirectory, "data.json");
// const replyDataFilePath = path.join(pathToDataDirectory, "replyData.json");

// app.post("/submit", (req, res) => {
//   const data = req.body;
//   data.id = Math.floor(Math.random() * 9000 + 1000);
//   data.raisedTime = moment().tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A");

//   if (!fs.existsSync(dataFilePath)) {
//     fs.writeFileSync(dataFilePath, JSON.stringify([data], null, 2));
//   } else {
//     const jsonData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
//     jsonData.push(data);
//     fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));
//     res.send("Data saved successfully.");
//   }
// });

// app.post("/reply", (req, res) => {
//   const replyData = req.body;

//   if (!fs.existsSync(replyDataFilePath)) {
//     fs.writeFileSync(replyDataFilePath, JSON.stringify([replyData], null, 2));
//   } else {
//     const jsonData = JSON.parse(fs.readFileSync(replyDataFilePath, "utf8"));
//     jsonData.push(replyData);
//     fs.writeFileSync(replyDataFilePath, JSON.stringify(jsonData, null, 2));
//     res.send("Reply data saved successfully.");
//   }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

