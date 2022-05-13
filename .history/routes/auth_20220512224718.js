const Router = require("express");
const passport = require("passport");
const Logout = require("../controllers/login.js");
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/', passport.authenticate('local'), (req, res) => res.send());

module.exports = router;
