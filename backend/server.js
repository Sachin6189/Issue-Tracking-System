const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
const moment = require("moment-timezone");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "172.27.129.80",
  user: "share_user",
  password: "share_user",
  database: "mysql",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE emp_name = ? AND password = ? AND status = 'active'";

  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const { emp_id, emp_name } = result[0];
      res
        .status(200)
        .json({ message: "Logged in successfully.", emp_id, emp_name });
    } else {
      res.status(401).send("Invalid credentials.");
    }
  });
});

app.post("/submit", (req, res) => {
  const {
    selectedEmployee,
    empID,
    selectedProject,
    selectedModule,
    selectedCategory,
    contact,
    issueTitle,
    description,
    imageData,
  } = req.body;

  const raisedTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const randomId = Math.floor(Math.random() * 9000 + 1000);

  const onBehalfValue = selectedEmployee ? selectedEmployee.value : null;

  const sql =
    "INSERT INTO it_tickets (ticket_id, on_behalf,emp_id, project_name, module_name, category, contact, issue_title, description, image_data, raised_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      randomId,
      onBehalfValue,
      empID,
      selectedProject.value,
      selectedModule.value,
      selectedCategory.value,
      contact,
      issueTitle,
      description,
      imageData,
      raisedTime,
    ],
    (err, result) => {
      if (err) throw err;
      res.status(200).send("Data sent successfully!");
    }
  );
});

app.get("/it_tickets", (req, res) => {
  const sql = "SELECT * FROM it_tickets";

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/it_reply", (req, res) => {
  const {
    ticketStatus,
    ccList,
    solutionTime,
    department,
    description,
    imageData,
    approvalRequired,
    selectedOption,
  } = req.body;

  const sql =
    "INSERT INTO it_reply (ticket_status, cc_list, solution_time, department, description, image_data, approval_reqd, selected_option) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      ticketStatus,
      ccList,
      solutionTime,
      department,
      description,
      imageData,
      approvalRequired,
      selectedOption,
    ],
    (err, result) => {
      if (err) throw err;
      res.status(200).send("Data sent successfully!");
    }
  );
});

app.get("/api/employees", (req, res) => {
  const sql = "SELECT emp_id FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }
    const empIds = result.map((row) => row.emp_id);
    res.status(200).json(empIds);
  });
});


app.get("/api/projects", (req, res) => {
  const sql = "SELECT project_name FROM it_projects";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }
    const projectNames = result.map((row) => row.project_name);
    res.status(200).json(projectNames);
  });
});

app.post("/api/modules", (req, res) => {
  const { projectName } = req.body;
  const sql =
    "SELECT module_name FROM it_modules WHERE project_id = (SELECT project_id FROM it_projects WHERE project_name = ?)";

  db.query(sql, projectName, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }
    const moduleNames = result.map((row) => row.module_name);
    res.status(200).json(moduleNames);
  });
});

app.post("/api/categories", (req, res) => {
  const { moduleName } = req.body;
  const sql =
    "SELECT category_name FROM it_category WHERE module_id = (SELECT module_id FROM it_modules WHERE module_name = ?)";

  db.query(sql, moduleName, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }
    const categoryNames = result.map((row) => row.category_name);
    res.status(200).json(categoryNames);
  });
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
