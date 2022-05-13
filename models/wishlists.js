const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  name: String,
  items: [
    {
      type: mongoose.Types.ObjectId,
      allowNull: true,
      ref: "Item",
    },
  ],
});
const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;
