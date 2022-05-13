const express = require("express");
const router = express.Router();
const { createUser, currentUser, updateUser } = require('../controllers/users.js');
const { verifyToken } = require("../utils/jwt.js");
const { ValidateSignup } = require('../middleware/validators/SignUp.js');

const userRouter = express();

userRouter.post('/create', ValidateSignup, createUser);
userRouter.get('/current', verifyToken, currentUser);
userRouter.put('/update', verifyToken, updateUser);

module.exports = userRouter;