const isAdmin = (req, res, next) => {
    if (req.user)
    if (req.isAuthenticated()) return next();
    res.sendStatus(403);
}

module.exports = {
    isAdmin
};