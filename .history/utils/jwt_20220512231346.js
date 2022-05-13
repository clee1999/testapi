const verifyToken = async (req, res) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.err('invalid token');
    }
}