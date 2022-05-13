const { strings } = require("../../constants/Strings");
const { body, validationResult } = require("express-validator");
const { roles } = require("../../constants/Roles");

const ValidateSignup = [
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
        .withMessage(strings.VALIDATE_PASSWORD_NEEDED)
        .isStrongPassword({
            minLength: 8,
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 1,
            minUppercase: 1
        })
        .withMessage(strings.VALIDATE_WEAK_PASSWORD),
    body('firstname')
        .exists()
        .withMessage(strings.VALIDATE_FIRSTNAME_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_FIRSTNAME)
        .trim()
        .escape(),
    body('lastname')
        .exists()
        .withMessage(strings.VALIDATE_LASTNAME_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_LASTNAME)
        .trim()
        .escape(),
    body('role')
        .exists()
        .withMessage(strings.VALIDATE_LASTNAME_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_LASTNAME)
        .trim()
        .isIn(roles)
        .escape(),
    (req, res, next) => {
        try {
            myValidationResult(req).throw();
            const { email, password, lastname, firstname } = req.body;

            req.body = {
                email,
                password,
                lastname,
                firstname
            };
            next();
        } catch (err) {
            console.log(err.mapped());
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
    ValidateSignup
};