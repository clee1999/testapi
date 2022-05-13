const Router = require("express");
const passport = require("passport");
const Logout = require("../controllers/login.js");

const routeruser = Router();


routeruser.post('/', passport.authenticate('local'), (req, res) => res.send());
routeruser.delete('/', Logout);


module.exports = routeruser;
