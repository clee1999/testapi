const Router = require("express");

const router = Router();


router.post('/', passport.authenticate('local'), (req, res) => res.send());
router.delete('/', Logout);


module.exports = router;
