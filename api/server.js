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
server.post("/api/users", (req, res) => {
  const body = req.body;
  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    Users.insert(body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

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
server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
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
        message: "The user could not be removed",
        err: err.message,
        stack: err.stack,
      });
    });
});

// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user

server.put("/api/users/:id", (req, res) => {
  //   Users.findById(req.params.id).then((user) => {
  //     if (!user) {
  //       res
  //         .status(404)
  //         .json({ message: "The user with the specified ID does not exist" });
  //     } else {
  //       //   res.json(user);
  //       const body = req.body;
  //       if (!body.name || !body.bio) {
  //         res
  //           .status(400)
  //           .json({ message: "Please provide name and bio for the user" });
  //       } else {
  //         Users.update(body)
  //           .then((user) => {
  //             res.status(201).json(user);
  //           })
  //           .catch((err) => {
  //             res.status(500).json({
  //               message:
  //                 "There was an error while saving the user to the database",
  //               err: err.message,
  //               stack: err.stack,
  //             });
  //           });
  //       }
  //     }
  //   });

  let body = req.body;
  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    Users.update(req.params.id, body)
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
          message: "The user information could not be modified",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
