const mongoose = require("mongoose");

const ItemSchema = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: String,
    price: Float,
  })
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
