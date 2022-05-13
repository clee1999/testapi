const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  // wishlists: [
  //   {
  //     type: Schema.Types.ObjecId,
  //     ref: Wishlist,
  //   },
  // ],
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
