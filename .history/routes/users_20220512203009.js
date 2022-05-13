const express = require("express");
const router = express.Router();
const { createUser, currentUser, updateUser } = require('../controllers/users.js');
const { isAuthenticated } = require('../validators/isAuthenticated.js');
const { ValidateSignup } = require('../validators/SignUp.js');

const userRouter = express();

userRouter.post('/create', ValidateSignup, createUser);
userRouter.get('/current', isAuthenticated, currentUser);
userRouter.put('/update', isAuthenticated, updateUser);

// userRouter.get("/", getUsers);
// userRouter.get("/:userID", getUser);
// userRouter.post("/", createUser);
// userRouter.put("/:userID", updateUser);
// userRouter.delete("/:userID", deleteUser);

module.exports = userRouter;