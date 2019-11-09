const express = require("express");
const router = express.Router();
const bookModel = require("../../models/Item/BookModel");

router.get('/', function (req, res, next) {
    bookModel.find({}, function(err, books) {
        let bookData = books.map(book => {
            return {
              _id: book._id,
              name: book.name,
              genre: book.genre,
              desc: book.desc,
              price: parseFloat(book.price)
            }
          })
        res.status = 200;
        res.json(bookData)
    });
})

router.get('/', function (req, res, next) {
    bookModel.find({}, function(err, books) {
        let bookData = books.map(book => {
            return {
              _id: book._id,
              name: book.name,
              genre: book.genre,
              desc: book.desc,
              price: parseFloat(book.price)
            }
          })
        res.status = 200;
        res.json(bookData)
    });
})

module.exports = router;
