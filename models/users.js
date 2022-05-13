const mongoose = require("mongoose");
const roles = require('../constants/Roles');

const UserSchema = new mongoose.Schema({

  lastname: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  role: {
    type: String,
    enum: [roles.USER, roles.ADMIN],
    default: roles.USER,
    required: true
  },
=======
  wishlists: [
    {
      type: mongoose.Types.ObjectId,
      allowNull: true,
      ref: "whitelist",
    },
  ],
>>>>>>> f1baf9b143a36ca8a400182b83f22dc9bf9d8e9b
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
