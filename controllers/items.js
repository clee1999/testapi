const Product = require("../models/Product.js");

// GET
const getItems = (req, res) => {
  Product.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getItem = (req, res) => {
  Product.findOne({ _id: req.params.productID })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "Product not found" }));
};

// POST
const createItem = (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  items.push(newItem);
  res.status(201).json(newItem);
};

// PUT
const updateItem = (req, res) => {
  const id = Number(req.params.itemID);
  const index = items.findIndex((item) => item.id === id);
  const updatedItem = {
    id: items[index].id,
    name: req.body.name,
    price: req.body.price,
  };

  items[index] = updatedItem;
  res.status(200).json("item updated");
};

// DELETE
const deleteItem = (req, res) => {
  const id = Number(req.params.itemID);
  const index = items.findIndex((item) => item.id === id);
  items.splice(index, 1);
  res.status(200).json("item deleted");
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
