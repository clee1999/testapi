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
  wishlists: [
    {
      type: mongoose.Types.ObjectId,
      allowNull: true,
      ref: "whitelist",
    },
  ],
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
