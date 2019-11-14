const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const validator = require("validator");

const AuthModel = require("../../models/Auth/AuthModel");
const REGCODE = require("../../util/constants");

const validateRegistration = userReg => {
    if (validator.isEmpty(userReg.username)) {
        return {
            code: REGCODE.USERNAME_MISSING,
            msg: "Error: Username is missing"
        }
    }

    if (validator.contains(userReg.username, " ")) {
        return {
            code: REGCODE.USERNAME_SPACES,
            msg: "Error: Username must not contain spaces"
        }
    }

    if (validator.isEmpty(userReg.password)) {
        return {
            code: REGCODE.PASSWORD_MISSING,
            msg: "Error: Password is missing"
        }
    }

    if (validator.isEmpty(userReg.password2)) {
        return {
            code: REGCODE.CONFIRMPWD_MISSING,
            msg: "Error: Confirmation password is missing"
        }
    }

    if (userReg.password !== userReg.password2) {
        return {
            code: REGCODE.PASSWORDS_DIFF,
            msg: "Error: Passwords are different"
        }
    }

    if (!validator.isEmail(userReg.email)) {
        return {
            code: REGCODE.EMAIL_INVALID,
            msg: "Error: Email is invalid"
        }
    }

    return null;
};

router.post("/register", async (req, res) => {
    try {
        let userReg = new AuthModel(req.body);

        // validate credentials
        // pretty basic - could do better
        let errorInfo = validateRegistration(userReg);

        if (errorInfo !== null) {
            // General client error - Bad request
            res.status(400).send(errorInfo);
            return;
        }

        // check if username already exists
        let authDoc = await AuthModel.findOne({ username: userReg.username }).exec();
        if (authDoc !== null) {
            let result = {
                code: REGCODE.USERNAME_REGISTERED,
                msg: "Error: Username already registered"
            }
            res.status(400).send(result);
            return;
        }

        // check if email already exists
        authDoc = await AuthModel.findOne({ email: userReg.email }).exec();
        if (authDoc !== null) {
            let result = {
                code: REGCODE.EMAIL_REGISTERED,
                msg: "Error: Email already registered"
            }
            res.status(400).send(result);
            return;
        }

        // save the auth info
        let persistedAuthInfo = new AuthModel({
            username: userReg.username,
            email: userReg.email
        });

        // Hash the password
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(userReg.password, salt);
        persistedAuthInfo.password = hash;

        // Save the auth doc with only hashed password
        var authInfo = new AuthModel(persistedAuthInfo);
        var result = await authInfo.save();
        res.send({ code: REGCODE.SUCCESS, msg: result });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
