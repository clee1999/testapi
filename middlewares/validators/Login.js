const { strings } = require("../../constants/Strings");
const { body, validationResult } = require("express-validator");
const { roles } = require("../../constants/Roles");

const ValidateLogin = [
    body('email')
        .exists()
        .withMessage(strings.VALIDATE_EMAIL_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_MAIL)
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail()
        .withMessage(strings.VALIDATE_INVALID_MAIL),
    body('password')
        .exists()
        .withMessage(strings.VALIDATE_PASSWORD_NEEDED),
    (req, res, next) => {
        try {
            myValidationResult(req).throw();
            const { email, password } = req.body;

            req.body = {
                email,
                password
            };
            next();
        } catch (err) {
            res.status(400).json({ message: err.mapped() }).send();
        }
    }
];

const myValidationResult = validationResult.withDefaults({
    formatter: (error) => ({
        msg: error.msg
    })
});


module.exports = {
    ValidateLogin
};