const Router = require("express");
const Router = require("express");
import passport from 'passport';
import { Logout } from '../controller/login.js';
const router = Router();


router.post('/', passport.authenticate('local'), (req, res) => res.send());
router.delete('/', Logout);


module.exports = router;
