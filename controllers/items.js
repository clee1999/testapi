const Item = require("../models/item.js");

// GET
const getItems = (req, res) => {
  Item.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getItem = (req, res) => {
  Item.findOne({ _id: req.params.itemID })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "item not found" }));
};

// POST
const createItem = (req, res) => {
  Item.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

// PUT
const updateItem = (req, res) => {
  Item.findOneAndUpdate({ _id: req.params.itemID }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "item not found" }));
};

// DELETE
const deleteItem = (req, res) => {
  Item.findOneAndDelete({ _id: req.params.itemID })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "item not found" }));
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
