//IMPORTS ON TOP
const Users = require("./users/model");
// BUILD YOUR SERVER HERE

const express = require("express");

const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json());

//CRUD
//Create===>POST
//Read=====>GET
//Update===>PUT
//Delete===>DELETE

//ENDPOINTS

server.get("/", (req, res) => {
  res.json({ jaan: "marlo" });
});

// POST	/api/users	Creates a user using the information sent inside the request body.
server.post("/api/users", (req, res) => {});

// GET	/api/users	Returns an array users.
server.get("/api/users", (req, res) => {
  let users = Users.find().then((users) => res.json(users));
});

// GET	/api/users/:id	Returns the user object with the specified id.
server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The user with the specified ID does not exist",
        err: err.message,
        stack: err.stack,
      });
    });
});

// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
server.delete("/api/users/:id", (req, res) => {});

// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user

server.put("/api/users/:id", (req, res) => {});

module.exports = server; // EXPORT YOUR SERVER instead of {}
