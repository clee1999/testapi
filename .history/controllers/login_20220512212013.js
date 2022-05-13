const User = require("../models/users.js");
const bcrypt = require("bcrypt");

const Login = async (email, password, done) => {
    console.log(email, password)
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return done(null, false);
    }
    console.log('✅ Connexion');
    return done(null, user)
}

module.exports = {
    Login
};

