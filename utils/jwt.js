const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.err('invalid token');
        res.sendStatus(403);
    }
}

module.exports = {
    verifyToken
};