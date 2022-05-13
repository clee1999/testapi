const Router = require("express");
const { login } = require("../controllers/login.js");

const router = Router();

router.post('/', login);
// router.delete('/', Logout);

module.exports = router;
