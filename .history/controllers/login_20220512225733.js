const User = require("../models/users.js");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
        console.log('❌ Le login n existe pas');
        return done(null, false);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        console.log('login failed');
        return res.sendStatus(401);
    }
    console.log('✅ Connexion');
    res.send( jwt.sign(user, 'your_jwt_secret'));
}

module.exports = {
    Login
};

