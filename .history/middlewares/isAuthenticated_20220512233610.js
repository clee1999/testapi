const isAuthenticated = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

}

module.exports = {
    isAuthenticated
};