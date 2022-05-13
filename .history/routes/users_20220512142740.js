import { Router } from 'express';
import { createParent, currentUser, updateUser } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { ValidateParentSignup } from '../middleware/Validators/SignUp.js';

const userRoutaer = Router();

userRouter.post('/create', ValidateParentSignup, createParent);
userRouter.get('/current', isAuthenticated, currentUser);
// router.get("/", getUsers);
// router.get("/:userID", getUser);
// router.post("/", createUser);
// router.put("/:userID", updateUser);
// router.delete("/:userID", deleteUser);


export default userRouter;