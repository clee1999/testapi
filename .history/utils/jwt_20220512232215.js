const verifyToken = () => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.err('invalid token');
        res.send
    }
}

module.exports = {
    verifyToken
};