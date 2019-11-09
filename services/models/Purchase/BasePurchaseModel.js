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
    "quantity" : Number,
    "units" : String,
    "price" : Number,
    "currency" : String
});
const BasePurchaseModel = mongoose.model( "BasePurchase", BasePurchaseSchema, "purchases" );

module.exports = BasePurchaseModel
