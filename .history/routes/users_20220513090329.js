const express = require("express");
const router = express.Router();
const { createUser, currentUser, updateUser } = require('../controllers/users.js');
const { isAuthenticated } = require("../middlewares/isAuthenticated.js");
const { ValidateSignup } = require('../middlewares/validators/SignUp.js');

const userRouter = express();

userRouter.post('/create', ValidateSignup, createUser);
userRouter.get('/current', isAuthenticated, currentUser);
userRouter.get('/current', isAdmin, get);
userRouter.put('/update', isAuthenticated, updateUser);

module.exports = userRouter;