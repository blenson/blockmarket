const mongoose = require("mongoose");

const BaseItemSchema = new mongoose.Schema({
    merchantId: String,
    merchantCountry: String,
    storeId: String,
    name: String,
    desc: String,
    price: mongoose.Types.Decimal128,
    shipping: mongoose.Types.Decimal128,
    image: {
        smallUrl: String,
        largeUrl: String
    },
    rating: Number,
    numRatings: Number,
    stock: Number
});
const BaseItemModel = mongoose.model("BaseItem", BaseItemSchema, "items");

module.exports = BaseItemModel;
