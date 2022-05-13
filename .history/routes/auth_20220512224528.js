const Router = require("express");
const passport = require("passport");
const Logout = require("../controllers/login.js");

const router = Router();

router.post('/', (err, user, info) => {
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

module.exports = router;
