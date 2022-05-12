const users = require("../data.js");

// GET
const getUsers = (req, res) => {
  res.json(users);
};

const getUser = (req, res) => {
  const id = Number(req.params.userID);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).send("user not found");
  }
  res.json(user);
};

// POST
const createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

// PUT
const updateUser = (req, res) => {
  const id = Number(req.params.userID);
  const index = users.findIndex((user) => user.id === id);
  const updatedUser = {
    id: users[index].id,
    name: req.body.name,
    price: req.body.price,
  };

  users[index] = updatedUser;
  res.status(200).json("user updated");
};

// DELETE
const deleteUser = (req, res) => {
  const id = Number(req.params.userID);
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  res.status(200).json("user deleted");
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
