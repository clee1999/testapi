const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const Login = async (email, password, done) => {
    console.log(email, password)
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false);
        // console.log('❌ Le login n existe pas');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return done(null, false);
    }
    console.log('✅ Connexion');
    return done(null, user)
}

const Logout = async (req, res) => {
    if (req.user) {
        req.logOut();
    }
    console.log('✅ Deconnexion');
    res.send(200);
}

module.exports = {
    Login,
    Logout
};

