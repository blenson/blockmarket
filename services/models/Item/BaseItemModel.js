const mongoose = require('mongoose');

const BaseItemSchema = new mongoose.Schema({
    "merchantId": String,
    "storeId": String,
    "name": String,
    "desc": String,
    "price": mongoose.Types.Decimal128,
    "image" : {
        "smallUrl" : String,
        "largeUrl" : String
    }
});
const BaseItemModel = mongoose.model( "BaseItem", BaseItemSchema, "items" );

module.exports = BaseItemModel
