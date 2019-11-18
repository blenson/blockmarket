const express = require("express");
const router = express.Router();
const passport = require("passport");

const BuyerModel = require("../../models/User/BuyerModel");

// get all
router.get('/', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        if (req.auth.admin === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var buyers = await BuyerModel.find({}).exec();
        res.send(buyers);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get one
router.get('/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        if (req.params.id !== req.auth.userid && req.auth.role === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var buyer = await BuyerModel.findById(req.params.id).exec();
        res.send(buyer);
    } catch (error) {
        res.status(500).send(error);
    }
});

// create new
router.post("/", async (req, res) => {
    try {
        var buyer = new BuyerModel(req.body);
        var result = await buyer.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update existing
router.put("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        if (req.params.id !== req.auth.userid && req.auth.role === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var buyer = await BuyerModel.findById(req.params.id).exec();
        buyer.set(req.body);
        var result = await buyer.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete one
router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        if (req.params.id !== req.auth.userid && req.auth.role === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var result = await BuyerModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
