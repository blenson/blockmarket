const express = require("express");
const router = express.Router();

const BookModel = require("../../models/Item/BookModel");

// get all
router.get('/', async (req, res) => {
    try {
        console.log('Req: ' + req.me);
        console.log('Res: ' + res);
        var books = await BookModel.find({}).exec();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get one
router.get('/:id', async (req, res) => {
    try {
        var book = await BookModel.findById(req.params.id).exec();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// create new
router.post("/", async (req, res) => {
    try {
        var book = new BookModel(req.body);
        var result = await book.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update existing
router.put("/:id", async (req, res) => {
    try {
        var book = await BookModel.findById(req.params.id).exec();
        book.set(req.body);
        var result = await book.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete one
router.delete("/:id", async (req, res) => {
    try {
        var result = await BookModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
