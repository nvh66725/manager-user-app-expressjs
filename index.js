const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mysql = require("mysql");
const { v4 } = require("uuid");
require("dotenv").config();

const PORT = process.env.PORT ?? 6900;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Hung169cr7*#",
  database: "icloud",
});
connection.connect((err) => {
  if (!err) {
    console.log("connect database successfully");
  } else {
    console.log(err);
  }
});

app.post("/register", (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;
  const name = req.body?.name;

  if (!username || !password || !name) {
    res.status(400).json({ success: false, message: "fields are require" });
    return;
  }

  const userId = v4();
  console.log(userId);
  connection.query(
    `insert into user (userId, username, password, name) value ('${userId}', '${username}', '${password}', '${name}')`,
    (err) => {
      if (!err) {
        res.json({ success: true, message: "register successfully" });
      } else {
        res
          .status(400)
          .json({ success: false, message: err.message ?? "register failed" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
