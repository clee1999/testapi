const mongoose = require("mongoose");

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
  role: {
    type: String,
    enum: [roles.PARENT, roles.PRO],
    default: roles.PARENT,
    required: true
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
