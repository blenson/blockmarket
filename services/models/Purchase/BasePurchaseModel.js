const mongoose = require('mongoose');

const BasePurchaseSchema = new mongoose.Schema({
    "storeId" : String,
    "storeName" : String,
    "buyerId" : String,
    "buyerName" : String,
    "merchantId" : String,
    "merchantName" : String,
    "itemId" : String,
    "itemName" : String,
    "orderDate" : Date,
    "currency" : String,
    "shipTo": {
        "postOfficeBox": String,
        "street1": String,
        "street2": String,
        "locality": String,
        "region": String,
        "country": String,
        "postCode": String
    }
});
const BasePurchaseModel = mongoose.model( "BasePurchase", BasePurchaseSchema, "purchases" );

module.exports = BasePurchaseModel

