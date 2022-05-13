const Router = require("express");
const passport = require("passport");
const Logout = require("../controllers/login.js");

const router = Router();


router.post('/', passport.authenticate('local'), (req, res) => res.send());
router.delete('/', Logout);


module.exports = touter;
