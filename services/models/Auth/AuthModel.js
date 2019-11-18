const mongoose = require('mongoose');
const BaseAuthModel = require('./BaseAuthModel');

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

module.exports = AuthModel;
