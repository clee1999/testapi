const User = require("../models/users.js");
const bcrypt = require("bcrypt");

const Login = async (email, password, done) => {
    console.log(email, password)
    const user = await User.findOne({ email });
    if (!user) {
        console.log('❌ Le login n existe pas');
        return done(null, false);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return done(null, false);
    }
    console.log('✅ Connexion');
    return done(null, user)
}

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user)
                    return done(null, false, { message: 'User not found' });
                const validate = await user.isValidPassword(password);

                if (!validate)
                    return done(null, false, { message: 'Wrong Password' });
            }

                return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
        }
    )
);

module.exports = {
    Login
};

