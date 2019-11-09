const mongoose = require('mongoose');
const BaseUserModel = require("./BaseUserModel");

// Derived buyer user model
const BuyerModel = BaseUserModel.discriminator('Buyer', 
    new mongoose.Schema({
    }));

module.exports = BuyerModel
