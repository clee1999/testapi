const Router = require("express");
const Router = require("express");
const Logout = require("../controllers/login.js");

const router = Router();


router.post('/', passport.authenticate('local'), (req, res) => res.send());
router.delete('/', Logout);


module.exports = router;
