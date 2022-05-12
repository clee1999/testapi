const wishlists = require("../data.js");

// GET
const getWishlists = (req, res) => {
  res.json(wishlists);
};

const getWishlist = (req, res) => {
  const id = Number(req.params.wishlistID);
  const wishlist = wishlists.find((wishlist) => wishlist.id === id);

  if (!wishlist) {
    return res.status(404).send("wishlist not found");
  }
  res.json(wishlist);
};

// POST
const createWishlist = (req, res) => {
  const newWishlist = {
    id: wishlists.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  wishlists.push(newWishlist);
  res.status(201).json(newWishlist);
};

// PUT
const updateWishlist = (req, res) => {
  const id = Number(req.params.wishlistID);
  const index = wishlists.findIndex((wishlist) => wishlist.id === id);
  const updatedWishlist = {
    id: wishlists[index].id,
    name: req.body.name,
    price: req.body.price,
  };

  wishlists[index] = updatedWishlist;
  res.status(200).json("wishlist updated");
};

// DELETE
const deleteWishlist = (req, res) => {
  const id = Number(req.params.wishlistID);
  const index = wishlists.findIndex((wishlist) => wishlist.id === id);
  wishlists.splice(index, 1);
  res.status(200).json("wishlist deleted");
};

module.exports = {
  getWishlists,
  getWishlist,
  createWishlist,
  updateWishlist,
  deleteWishlist,
};
