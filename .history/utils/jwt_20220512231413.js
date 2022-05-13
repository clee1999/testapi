const verifyToken = async () => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.err('invalid token');
    }
}

module.exports = {
    verifyToken
};