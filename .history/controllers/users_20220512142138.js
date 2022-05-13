const User = require("../models/users.js");

// GET
const getUsers = (req, res) => {
  User.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.userID })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "user not found" }));
};

// POST
// const createUser = (req, res) => {
//   User.create(req.body)
//     .then((result) => res.status(200).json({ result }))
//     .catch((error) => res.status(500).json({ msg: error }));
// };

export const createParent = async (req, res) => {
  console.log('toto');
  // create and save new player in DB
  const { email, password, firstname, lastname, phone, birthday, address, city, country, zipcode } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hash,
    firstname,
    lastname,
    phone,
    birthday,
    address,
    city,
    country,
    zipcode,
    role: roles.PARENT
  });
  user.save();
  console.log('✅ Inscription');
  sendRegistrationEmail(email);
  res.send();
}

// PUT
const updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.userID }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "user not found" }));
};

// DELETE
const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.userID })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "user not found" }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
