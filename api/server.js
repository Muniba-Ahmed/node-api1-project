//IMPORTS ON TOP
const Users = require("./users/model");
// BUILD YOUR SERVER HERE

const express = require("express");

const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json());

//ENDPOINTS

server.get("/", (req, res) => {
  res.json({ jaan: "marlo" });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
