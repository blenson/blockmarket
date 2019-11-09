const mongoose = require('mongoose');

const BaseUserSchema = new mongoose.Schema({
    "fullName": String,
    "firstName" : String,
    "lastName" : String,
    "address" : {
        "postOfficeBox" : String,
        "street1" : String,
        "street2" : String,
        "locality" : String,    // e.g. city
        "region" : String,      // e.g. province/state
        "country" : String,
        "postCode" : String
    },
    "email" : String,
    "phone" : String,
    "purchases" : [{
        "id" : String,
        "name" : String,
        "date" : Date,
        "quantity" : Number,
        "price" : Number
    }]
});

const BaseUserModel = mongoose.model( "BaseUser", BaseUserSchema, "users" );

module.exports = BaseUserModel
