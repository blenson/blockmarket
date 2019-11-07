const mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    "title": String,
    "genre": String,
    "desc": String,
    "price": mongoose.Types.Decimal128
});

const ItemModel = mongoose.model( "Items", ItemSchema, "items" );

const dummyItemData = [
    {
        id:1,
        title:"Book 1", 
        genre:"Cooking",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.", 
        price:12.40
    },
    {
        id:2,
        title:"Book 2", 
        genre:"Romance",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.", 
        price:34.95
    },
    {
        id:3,
        title:"Book 3", 
        genre:"Science",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:17.79
    },
    {
        id:4,
        title:"Book 4", 
        genre:"Romance",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:42.99
    },
    {
        id:5,
        title:"Book 5", 
        genre:"Art",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:45.90
    },
    {
        id:6,
        title:"Book 6", 
        genre:"Art",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:12.95
    }
    ,
    {
        id:7,
        title:"Book 7", 
        genre:"Business",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:26.95
    },
    {
        id:8,
        title:"Book 8", 
        genre:"Business",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:16.95
    },
    {
        id:9,
        title:"Book 9", 
        genre:"Business",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:93.00
    }        
];


ItemModel.countDocuments({}, function(err, c) {
    if (c == 0) {
        dummyItemData.map(item => {
            var itemInstance = new ItemModel(
                { 
                    title: item.title,
                    genre: item.genre,
                    desc: item.desc,
                    price: item.price
            });
            itemInstance.save(function (err, item) {
                if (err) return console.error(err);
                console.log(item.title + " saved to items collection.");
            });
        });
    }
});

module.exports = ItemModel
