const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const items_routes = require("./routes/items.js");
const users_routes = require("./routes/users.js");
const wishlists_routes = require("./routes/wishlists.js");
const db = require("./conf/database.js");
const authRouter = require("./routes/auth.js");
const { passportInit } = require("./conf/passport.js");
const app = express();

require("dotenv").config();
app.use(express.json());

mongoose
  .connect(
    process.env.NODE_ENV !== "test"
      ? process.env.MONGO_URI
      : process.env.MONGO_TEST_URI
  )
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      app.listen(3000, () => {
        console.log("✅ server is listening on port 3000");
      });
    }
  });

passportInit(passport);

//configure_express_session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Quand_on_sera_en_https
      maxAge: 30 * 24 * 60 * 60 * 1000, // la session va durer 30 jours
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

////// ENTITY
app.use("/api/items", items_routes);
app.use("/api/users", users_routes);
app.use("/api/wishlists", wishlists_routes);
app.use("/session", authRouter);

module.exports = { app };
/////////// MIDDLEWARE
const logger = (req, res, next) => {
  // console.log(req.url);
  // console.log(req.params);
  // console.log(req.query);
  // console.log(res);
  next();
};

app.use(logger); // execute your middleware for all requests

app.get("/about", (req, res) => {
  return res.send("About Page");
});
