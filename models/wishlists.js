
const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [
    {
      type: mongoose.Types.ObjectId,
      allowNull: true,
      ref: "Item",
      required: true
    },
  ],
});
const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;





