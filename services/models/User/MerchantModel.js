const mongoose = require("mongoose");
const BaseUserModel = require("./BaseUserModel");
const DEMODATA = require("../constants");
const ObjectID = require('mongodb').ObjectID;

// Derived merchant model
const MerchantModel = BaseUserModel.discriminator(
    "Merchant",
    new mongoose.Schema({
        stores: [
            {
                storeId: String,
                storeName: String
            }
        ]
    })
);

const dummyMerchantData = [
    {
        _id: DEMODATA.MERCHANT_ID,
        username: DEMODATA.MERCHANT_USERNAME,
        country: DEMODATA.MERCHANT_COUNTRY,
        storeId: DEMODATA.MERCHANT_STORE_ID, 
        storeName: DEMODATA.MERCHANT_STORE_NAME
    }
];

MerchantModel.countDocuments({}, function(err, c) {
    if (c == 0) {
        dummyMerchantData.map(item => {
            var instance = new MerchantModel({
                _id: new ObjectID(item._id),
                username: item.username,
                address: {
                    country: item.country
                },
                stores: [
                    {
                        storeId: item.storeId,
                        storeName: item.storeName
                    }
                ]
            });
            instance.save(function(err, item) {
                if (err) return console.error(err);
                console.log(item.username + " saved to merchant user collection.");
            });
        });
    }
});

module.exports = MerchantModel;
