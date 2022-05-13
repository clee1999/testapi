const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
const passport = require('passport');
const items_routes = require("./routes/items.js");
const users_routes = require("./routes/users.js");
const wishlists_routes = require("./routes/wishlists.js");
const db = require('./conf/database.js');
const authRouter = require('./routes/auth.js');
const { passportInit } = require('./conf/passport.js');
const session = require('express-session');
const express = require("express");
const bodyParser = require("body-parser");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


require("dotenv").config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
      console.log("✅ server is listening on port 3000");
    })
  }
}
);


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
      sameSite: 'none',
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

////// ENTITY
app.use("/api/items", items_routes);
app.use("/api/users", users_routes);
app.use("/api/wishlists", wishlists_routes);
app.use("/session", authRouter);

module.exports = app;
/////////// MIDDLEWARE
const logger = (req, res, next) => {
  next();
};

app.use(logger); // execute your middleware for all requests

app.get("/about", (req, res) => {
  return res.send("About Page");
});


module.exports = { app }
