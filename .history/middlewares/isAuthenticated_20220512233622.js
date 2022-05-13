const { verifyToken } = require("../utils/jwt");

const isAuthenticated = async (req, res) => {
    const { email, password } = req.body;

    verifyToken()
}

module.exports = {
    isAuthenticated
};