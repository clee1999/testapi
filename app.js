const express = require("express");
const app = express();
const items = require("./entities/items.js");
const users = require("./entities/users.js");
const wishlists = require("./entities/wishlists.js");

const items_routes = require("./routes/items.js");
const users_routes = require("./routes/users.js");
const wishlists_routes = require("./routes/wishlists.js");

//////// SERVER LISTEN
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

////// ENTITY
app.use("/api/items", items_routes);
app.use("/api/users", users_routes);
app.use("/api/wishlists", wishlists_routes);

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
