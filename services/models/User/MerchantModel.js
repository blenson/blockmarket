const mongoose = require('mongoose');
const BaseUserModel = require("./BaseUserModel");

// Derived merchant model
const MerchantModel = BaseUserModel.discriminator('Merchant', 
    new mongoose.Schema({
        "stores": [{
            "storeId" : String,
            "storeName" : String
        }]
    }));

module.exports = MerchantModel
