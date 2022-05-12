const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
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
