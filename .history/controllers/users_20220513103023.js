const User = require("../models/users.js");
const bcrypt = require("bcrypt");

// GET
const getUsers = (req, res) => {
  User.find({}, { password: 0 })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const createUser = async (req, res) => {
  // create and save new player in DB
  try {
    const { email, password, firstname, lastname, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hash,
      firstname,
      lastname,
      role
    });
    await user.save();
    console.log('✅ Inscription');
    res.send("Inscription fait");
  }
  catch (err) {
    console.log(err);
    res.status(400).send("Email deja existant");
  }
}

const currentUser = async (req, res) => {
  console.log(res.user);
  res.send(req.user);
}

const updateUser = async (req, res) => {
  console.log('body', req.body);
  const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, req.body);
  res.send(updatedUser);
}

// DELETE
const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.userID })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "user not found" }));
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.userID })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "user not found" }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  currentUser
};

// // PUT
// const updateUser = (req, res) => {
//   User.findOneAndUpdate({ _id: req.params.userID }, req.body, {
//     new: true,
//     runValidators: true,
//   })
//     .then((result) => res.status(200).json({ result }))
//     .catch((error) => res.status(404).json({ msg: "user not found" }));
// };