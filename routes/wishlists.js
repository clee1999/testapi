const express = require("express");
const router = express.Router();

const {
  getWishlists,
  getWishlist,
  createWishlist,
  updateWishlist,
  deleteWishlist,
} = require("../controllers/wishlists.js");

router.get("/", getWishlists);

router.get("/:wishlistID", getWishlist);

router.post("/", createWishlist);

router.put("/:wishlistID", updateWishlist);

router.delete("/:wishlistID", deleteWishlist);

module.exports = router;
