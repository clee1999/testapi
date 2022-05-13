const isAuthenticated = (req, res, next) => {
    console.log(req.isAuthenticated());
    console.log(req.user);
    if (req.isAuthenticated()) return next();
    res.sendStatus(403);
}


module.exports = {
    getUsers,
    // getUser,
    createUser,
    updateUser,
    deleteUser,
};
