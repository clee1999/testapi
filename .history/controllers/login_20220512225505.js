const User = require("../models/users.js");
const bcrypt = require("bcrypt");

const Login = async (email, password) => {
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
        console.log('❌ Le login n existe pas');
        return done(null, false);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        console.log('login failed');

    }
    console.log('✅ Connexion');
    res.send
}

module.exports = {
    Login
};

