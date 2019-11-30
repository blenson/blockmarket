const mongoose = require('mongoose');
const BasePurchaseModel = require("./BasePurchaseModel");

// Derived order model
const OrderModel = BasePurchaseModel.discriminator('Order', 
    new mongoose.Schema({
        "paymentMethod" : String,
        "orderSubTotal" : Number,
        "shippingCost" : Number,
        "platformCharge" : String,
        "tax1" : Number,
        "tax2" : Number,
        "orderTotal" : Number,
        "shippingMethod" : String,
        "status" : String,
        "details" : [
            {
                "itemid": String,
                "name": String,
                "quantity": Number,
                "unitprice": Number,
                "shipping": Number
            }
        ],
        "trackingNumber" : String,
        "trackingUrl" : String,
        "transaction" : [{
            "statusCode" : String,  // cancelled, paid, packaging, shipped, delivered, returned
            "statusLocation" : String,
            "statusDesc" : String,
            "statusDate" : String
        }]
    }));

module.exports = OrderModel
