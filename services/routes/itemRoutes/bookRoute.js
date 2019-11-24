const express = require("express");
const router = express.Router();
const passport = require("passport");

const BookModel = require("../../models/Item/BookModel");

// get first 'num' books
router.get("/limit/:num", async (req, res) => {
    try {
        var books = await BookModel.find({})
            .sort({ name: 1 })
            .limit(Number(req.params.num))
            .exec();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Return the number of documents in the collection.
// We may want to change the countDocuments to estimatedCount later
// if the number of books becmoes huge and performance takes a hit.
router.get("/count", async (req, res) => {
    try {
        var count = await BookModel.countDocuments({}).exec();
        res.send({ count: count });
    } catch (error) {
        res.status(500).send(error);
    }
});

// get one
router.get("/:id", async (req, res) => {
    try {
        var book = await BookModel.findById(req.params.id).exec();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// create new
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        var book = new BookModel(req.body);
        if (req.auth.admin !== 0) {
            var result = await book.save();
            res.send(result);
        } else if (req.auth.isMerchant === true && book.merchantId === req.auth.userid) {
            var result = await book.save();
            res.send(result);
        } else {
            res.status(401).send("Not authorised");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// update existing
router.put("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        if (req.auth.isMerchant !== true && req.auth.admin === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var book = await BookModel.findById(req.params.id).exec();
        book.set(req.body);
        if (req.auth.admin !== 0) {
            var result = await book.save();
            res.send(result);
        } else if (req.auth.isMerchant === true && book.merchantId === req.auth.userid) {
            var result = await book.save();
            res.send(result);
        } else {
            res.status(401).send("Not authorised");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete one
router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        if (req.auth.admin === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var result = await BookModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
