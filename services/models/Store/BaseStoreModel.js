const mongoose = require('mongoose');

const BaseStoreSchema = new mongoose.Schema({
    "name": String,
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
});
const BaseStoreModel = mongoose.model( "BaseStore", BaseStoreSchema, "stores" );

module.exports = BaseStoreModel
