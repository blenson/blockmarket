const mongoose = require('mongoose');
const BaseItemModel = require("./BaseItemModel");

// Derived book model
const BookModel = BaseItemModel.discriminator('Book', 
    new mongoose.Schema({
        "genre": String,
        "condition" : String,   // new/used
        "format" : String,  // audio, hardcover, paperback, eBook
        "author" : String,
        "isbn10" : String,
        "isbn13" : String,
        "pages" : Number,
        "edition" : String,
        "publishYear" : String,
        "publisher" : String
    }));


// Initialize collections with dummy data

const dummyBookData = [
    {
        name:"Book 1", 
        genre:"Cooking",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.", 
        price:12.40
    },
    {
        name:"Book 2", 
        genre:"Romance",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.", 
        price:34.95
    },
    {
        name:"Book 3", 
        genre:"Science",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:17.79
    },
    {
        name:"Book 4", 
        genre:"Romance",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:42.99
    },
    {
        name:"Book 5", 
        genre:"Art",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:45.90
    },
    {
        name:"Book 6", 
        genre:"Art",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:12.95
    }
    ,
    {
        name:"Book 7", 
        genre:"Business",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:26.95
    },
    {
        name:"Book 8", 
        genre:"Business",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:16.95
    },
    {
        name:"Book 9", 
        genre:"Business",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
        price:93.00
    }        
];


BookModel.countDocuments({}, function(err, c) {
    if (c == 0) {
        dummyBookData.map(item => {
            var bookInstance = new BookModel(
                { 
                    name: item.name,
                    genre: item.genre,
                    desc: item.desc,
                    price: item.price
            });
            bookInstance.save(function (err, item) {
                if (err) return console.error(err);
                console.log(item.name + " saved to items collection.");
            });
        });
    }
});

module.exports = BookModel
