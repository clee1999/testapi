const express = require("express");
const app = express();
const items = require("./entities/items.js");
const users = require("./entities/users.js");
const wishlists = require("./entities/wishlists.js");

//////// SERVER LISTEN
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

////// ENTITY
//// ITEMS
/// GET
app.get("/api/items", (req, res) => {
  res.json(items);
});
app.get("/api/items/:itemId", (req, res) => {
  const id = Number(req.params.itemId);
  const item = items.find((item) => item.id === id);
  if (!item) {
    return res.status(404).send("item not found");
  }
  res.json(item);
});
app.get("/api/query", (req, res) => {
  const name = req.query.name.toLowerCase();
  const item_result = items.filter((item) =>
    item.name.toLowerCase().includes(name)
  );

  if (item_result.length < 1) {
    return res.status(200).send("No products matched your search");
  }
  res.json(item_result);
});
/// POST
app.post("/api/items", (req, res) => {
  const newItems = {
    id: items.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  items.push(newItems);
  res.status(201).json(newItems);
});
/// PUT
app.put("/api/items/:itemId", (req, res) => {
  const id = Number(req.params.itemId);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).send("item not found");
  }
  const updatedItem = {
    id: items[index].id,
    name: req.body.name,
    price: req.body.price,
  };
  items[index] = updatedItem;
  res.status(200).json("item updated");
});
/// DELETE
app.delete("/api/items/:itemId", (req, res) => {
  const id = Number(req.params.itemId);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).send("item not found");
  }
  items.splice(index, 1);
  res.status(200).json("Product deleted");
});

////// USERS
app.get("/api/users", (req, res) => {
  res.json(items);
});
app.get("/api/users/:userId", (req, res) => {
  const id = Number(req.params.userId);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});

// WISHLISTS
app.get("/api/wishlists", (req, res) => {
  res.json(items);
});
app.get("/api/wishlists/:wishlistId", (req, res) => {
  const id = Number(req.params.wishlistId);
  const wishlist = wishlists.find((wishlist) => wishlist.id === id);
  if (!wishlist) {
    return res.status(404).send("Wishlist not found");
  }
  res.json(wishlist);
});

/////////// MIDDLEWARE
const logger = (req, res, next) => {
  console.log(req.url);
  console.log(req.params);
  console.log(req.query);
  console.log(res);
  next();
};

app.use(logger); // execute your middleware for all requests

app.get("/about", (req, res) => {
  return res.send("About Page");
});
