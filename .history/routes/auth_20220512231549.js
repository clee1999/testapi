const Router = require("express");
const Logout = require("../controllers/login.js");

const router = Router();

router.post('/', login);
// router.delete('/', Logout);

module.exports = router;
