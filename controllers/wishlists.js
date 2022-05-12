const Wishlist = require("../models/wishlists.js");
// GET
const getWishlists = (req, res) => {
  Wishlist.findAll({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getWishlist = (req, res) => {
  Wishlist.findOne({ _id: req.params.wishlistID })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "wishlist not found" }));
};

// POST
const createWishlist = (req, res) => {
  response = new Wishlist({
    name: req.body.name,
    items: req.body.items,
  });
  response
    .save()
    .then((result) => res.status(201).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

// PUT
const updateWishlist = (req, res) => {
  Wishlist.findOneAndUpdate({ _id: req.params.wishlistID }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "wishlist not found" }));
};

// DELETE
const deleteWishlist = (req, res) => {
  Wishlist.findOneAndDelete({ _id: req.params.wishlistID })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "wishlist not found" }));
};

module.exports = {
  getWishlists,
  getWishlist,
  createWishlist,
  updateWishlist,
  deleteWishlist,
};
