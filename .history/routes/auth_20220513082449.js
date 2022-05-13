const Router = require("express");
const { login } = require("../controllers/login.js");

const router = Router();


router.post('/', passport.authenticate('local'), (req, res) => res.send());
router.delete('/', Logout);


module.exports = router;
