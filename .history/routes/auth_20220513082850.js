const Router = require("express");
const passport = require("passport");
const Logout = require("../controllers/login.js");

const router = Router();


touter.post('/', passport.authenticate('local'), (req, res) => res.send());
touter.delete('/', Logout);


module.exports = touter;
