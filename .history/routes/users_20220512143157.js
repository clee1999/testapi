const express = require("express");
const router = express.Router();
const { createParent, currentUser, updateUser } = require('../controller/user.js');
const { isAuthenticated } = require('../middleware/isAuthenticated.js');
// const { ValidateParentSignup } = require('../Validators/SignUp.js');
const { ValidateParentSignup } = require('../Validators/SignUp.js');

const userRouter = express();

userRouter.post('/create', ValidateParentSignup, createParent);
userRouter.get('/current', isAuthenticated, currentUser);
// router.get("/", getUsers);
// router.get("/:userID", getUser);
// router.post("/", createUser);
// router.put("/:userID", updateUser);
// router.delete("/:userID", deleteUser);


module.exports = userRouter;