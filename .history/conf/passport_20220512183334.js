const User = require("../models/users.js");
const Login = require("../controllers/login.js");
const LocalStrategy = require("passport-local");

const passportInit = (passport) => {
    //_Define_strategy_to_apply 
    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' },
            Login
        )
    );
    console.log('✅ Passport loaded.');

    //_Specify_which_data_should_be_store_in_session 
    passport.serializeUser((user, done) =>
        done(null, user._id)
    );

    //_Invoked_on_every_request_and_enable_to_reload_user_data 
    passport.deserializeUser(async (_id, done) => {
        const user = await User.findById(_id, { password: 0 });
        done(null, user);
    });
};

module.exports = {
    passportInit
};


// req.user
// req.isAuthenticated()
