import { Router } from 'express';
import passport from 'passport';
import { Logout } from '../controller/login.js';
const Router = require("express");

const router = Router();

router.post('/', passport.authenticate('local'), (req, res) => res.send());
router.delete('/', Logout);

export default router;