const Router = require("express");
const passport = require("passport");
const Logout = require("../controllers/login.js");
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/', login);

module.exports = router;
