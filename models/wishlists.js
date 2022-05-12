const mongoose = require("mongoose");

const WishlistSchema = mongoose.model(
  "Wishlist",
  new mongoose.Schema({
    name: String,
    items: [
      {
        type: Schema.Types.ObjecId,
        ref: Item,
      },
    ],
  })
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;
