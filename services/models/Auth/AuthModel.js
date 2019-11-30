const mongoose = require('mongoose');
const BaseAuthModel = require('./BaseAuthModel');
const DEMODATA = require("../constants");
const bcrypt = require("bcryptjs");

// Derived authentication model
const AuthModel = BaseAuthModel.discriminator(
    "Auth",
    new mongoose.Schema({
        "username": String,
        "password": String,
        "password2": String,
        "email": String,
        "isMerchant": Boolean,
        "userid" : String,
        "role": Number
    })
);

const dummyAuthData = [
    {
        username: DEMODATA.MERCHANT_USERNAME,
        password: DEMODATA.MERCHANT_PASSWORD,
        email: DEMODATA.MERCHANT_EMAIL,
        userid: DEMODATA.MERCHANT_ID,
        role: 0
    }
];

AuthModel.countDocuments({}, function (err, c) {
    let salt = bcrypt.genSaltSync(10);

    if (c == 0) {
        dummyAuthData.map(item => {
            var pass = bcrypt.hashSync(item.password, salt);
            var instance = new AuthModel({
                username: item.username,
                userid: item.userid,
                password: pass,
                email: item.email,
                role: item.role,
                isMerchant: true
            });
            instance.save(function(err, item) {
                if (err) return console.error(err);
                console.log(item.username + " saved to auth collection.");
            });
        });
    }
});


module.exports = AuthModel;
