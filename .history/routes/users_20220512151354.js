const express = require("express");
const router = express.Router();
const { createUser, currentUser, updateUser } = require('../controllers/users.js');
const { isAuthenticated } = require('../validators/isAuthenticated.js');
const { ValidateSignup } = require('../validators/SignUp.js');

const userRouter = express();

userRouter.post('/create', ValidateSignup, createUser);
userRouter.get('/current', isAuthenticated, currentUser);
// router.get("/", getUsers);
// router.get("/:userID", getUser);
// router.post("/", createUser);
// router.put("/:userID", updateUser);
// router.delete("/:userID", deleteUser);

module.exports = userRouter;