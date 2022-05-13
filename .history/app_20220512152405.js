const express = require("express");
const app = express();
const mongoose = require("mongoose");
const items_routes = require("./routes/items.js");
const users_routes = require("./routes/users.js");
const wishlists_routes = require("./routes/wishlists.js");
const db = require('./conf/database.js';

//////// SERVER LISTEN
// app.listen(3000, () => {
//   console.log("server is listening on port 3000");
// });
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI).then(() =>
  app.listen(3000, () => {
    console.log("✅ server is listening on port 3000");
  })
);

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
