const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/submit", (req, res) => {
  const data = req.body;

  if (!fs.existsSync("data.json")) {
    fs.writeFileSync("data.json", JSON.stringify([data], null, 2));
  } else {
    const jsonData = JSON.stringify(data, null, 2);
    fs.readFile("data.json", "utf8", (err, fileData) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error reading file.");
      }

      const parsedFileData = JSON.parse(fileData);
      parsedFileData.push(data);

      fs.writeFileSync("data.json", JSON.stringify(parsedFileData, null, 2));

      res.send("Data saved successfully.");
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});