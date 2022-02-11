const express = require("express");
const { generateRandomNumber } = require("../utils");

// create a new express app
const app = express();

// example on how to serve a simple API
app.get("/random", (req, res) => res.send(generateRandomNumber()));

// example on how to serve static files from a given folder
app.use(express.static("public"));

module.exports = { app };
