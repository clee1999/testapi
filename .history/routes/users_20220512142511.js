// const express = require("express");
// const router = express.Router();

// const {
//   getUsers,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
// } = require("../controllers/users.js");

// router.get("/", getUsers);

// router.get("/:userID", getUser);

// router.post("/", createUser);

// router.put("/:userID", updateUser);

// router.delete("/:userID", deleteUser);

// module.exports = router;

import { Router } from 'express';
import { createParent, currentUser, updateUser } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { ValidateParentSignup } from '../middleware/Validators/SignUp.js';

const userRouter = Router();

userRouter.post('/create', ValidateParentSignup, createParent);
userRouter.get('/current', isAuthenticated, currentUser);
userRouter.put('/update', isAuthenticated, updateUser);


export default userRouter;