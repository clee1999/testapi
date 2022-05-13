const Router = require("express");
const Router = require("express");
const Logout = require("../controllers/login.js");

const routeruser = Router();


routeruser.post('/', passport.authenticate('local'), (req, res) => res.send());
routeruser.delete('/', Logout);


module.exports = routeruser;
