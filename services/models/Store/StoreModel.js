const mongoose = require('mongoose');
const BaseStoreModel = require("./BaseStoreModel");

// Derived store model
const StoreModel = BaseStoreModel.discriminator('Store', 
    new mongoose.Schema({
        "merchantId" : String,
        "paymentAccepted" : [String],
        "availability" : String,      // opened, closed, maintenance, 
        "logoUrl" : String,
        "language" : [String],      // spoken languages
        "legalName" : String,
        "taxId" : String,           // Fiscal tax ID (e.g. TIN in US)
        "salesTax1" : String,
        "salesTax2" : String,
    }));

module.exports = StoreModel
