const express = require("express");
const router = express.Router();

const BuyerModel = require("../../models/User/BuyerModel");

// get all
router.get('/', async (req, res) => {
    try {
        var buyers = await BuyerModel.find({}).exec();
        res.send(buyers);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get one
router.get('/:id', async (req, res) => {
    try {
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
router.put("/:id", async (req, res) => {
    try {
        var buyer = await BuyerModel.findById(req.params.id).exec();
        buyer.set(req.body);
        var result = await buyer.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete one
router.delete("/:id", async (req, res) => {
    try {
        var result = await BuyerModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
