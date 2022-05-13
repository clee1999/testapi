import { Router } from 'express';
import { createParent, currentUser, updateUser } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { ValidateParentSignup } from '../middleware/Validators/SignUp.js';

const userRouter = Router();

userRouter.post('/create', ValidateParentSignup, createParent);
userRouter.get('/current', isAuthenticated, currentUser);


export default userRouter;