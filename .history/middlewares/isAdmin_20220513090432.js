const { roles } = require("../constants/Roles");

const isAdmin = (req, res, next) => {
    if (req.user.role = roles.ADMIN)
    if (req.isAuthenticated()) return next();
    res.sendStatus(403);
}

module.exports = {
    isAdmin
};