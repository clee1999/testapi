const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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
    res.json(jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }));
}

const verifyToken = async (req, res) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch(err) {
        console.err('invalid token');
      }
}

module.exports = {
    Login
};

