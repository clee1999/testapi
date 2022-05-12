const Wishlist = require("../models/Wishlist.js");
// GET
const getWishlists = (req, res) => {
  Wishlist.find({})
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
  Wishlist.create(req.body)
    .then((result) => res.status(200).json({ result }))
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
