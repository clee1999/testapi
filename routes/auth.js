const Router = require("express");
const passport = require("passport");
const { Logout } = require("../controllers/login.js");
const { ValidateLogin } = require("../middlewares/validators/Login.js");

const router = Router();


router.post('/', ValidateLogin, passport.authenticate('local'), (req, res) => res.send());
router.delete('/', Logout);


module.exports = router;
