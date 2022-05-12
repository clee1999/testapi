const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
const items_routes = require("./routes/items.js");
const users_routes = require("./routes/users.js");
const wishlists_routes = require("./routes/wishlists.js");

//////// SERVER LISTEN
// app.listen(3000, () => {
//   console.log("server is listening on port 3000");
// });
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI).then(() =>
  app.listen(3000, () => {
    console.log("server is listening on port 3000");
  })
);
module.exports = app;

/////////// MIDDLEWARE
const logger = (req, res, next) => {
  next();
};

app.use(logger); // execute your middleware for all requests

app.get("/about", (req, res) => {
  return res.send("About Page");
});
////// ENTITY
app.use("/api/items", items_routes);
app.use("/api/users", users_routes);
app.use("/api/wishlists", wishlists_routes);
