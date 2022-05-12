const express = require("express");
const router = express.Router();

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/items.js");

router.get("/", getItems);

router.get("/:itemID", getItem);

router.post("/", createItem);

router.put("/:itemID", updateItem);

router.delete("/:itemID", deleteItem);

module.exports = router;
