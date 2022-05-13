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

// user connecter :
// - appeler login 
// renvoi 200 ou 401?
// test 200 et test 401
// mauvais login ?
// bon login ?
// mauvaise valeur ?



const validLogin = [
    { email: 'moussiamottal@gmail.com', password: '' }, // user
    { email: 'admin@gmail.com', password: '' }, // admin
]

const invalidLogin = [
    { email: 'moussiamottal@gmail.com', password: '' },
    { email: 'admin@gmail.com', password: '' }, // admin
]