const express = require("express");
const router = express.Router();
const { createUser, currentUser, updateUser } = require('../controllers/users.js');
const { isAuthenticated } = require('../validators/isAuthenticated.js');
const { ValidateSignup } = require('../validators/SignUp.js');
const jwt = require('jsonwebtoken');

const userRouter = express();

userRouter.post('/create', ValidateSignup, createUser);
userRouter.get('/current', isAuthenticated, currentUser);
userRouter.put('/update', isAuthenticated, updateUser);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');
                        return next(error);
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);
                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, 'TOP_SECRET');
                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

module.exports = userRouter;