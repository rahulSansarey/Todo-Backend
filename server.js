const mongoose = require("mongoose");
const express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");

// Creating an instance of express as app
const app = express();
require("dotenv").config({ path: "./config.env" });

// Adding cors to get the data from Frontend
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Import Db from db.js
const db = require("./db");

//Adding cookie parser

app.use(cookieParser());

// Adding body parser

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Helloworld");
});

// Imporrting Routes
const Todo = require("./routes/todoRoutes.js");
const User = require("./routes/userRoutes.js");

app.use("/api/v1", Todo);
app.use("/api/v1/user", User);

app.listen(PORT, () => {
  console.log("server is running on port", { PORT });
});
