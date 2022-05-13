const express = require("express");
const router = express.Router();
const { createUser, currentUser, updateUser, getUsers } = require('../controllers/users.js');
const { isAdmin } = require("../middlewares/isAdmin.js");
const { isAuthenticated } = require("../middlewares/isAuthenticated.js");
const { ValidateSignup } = require('../middlewares/validators/SignUp.js');

const userRouter = express();

userRouter.post('/create', ValidateSignup, createUser);
userRouter.get('/current', isAuthenticated, currentUser);
userRouter.get('/', isAuthenticated, isAdmin, getUsers);
userRouter.put('/update', isAuthenticated, updateUser);

module.exports = userRouter;