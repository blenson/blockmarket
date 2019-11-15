const express = require("express");
const router = express.Router();

const MerchantModel = require("../../models/User/MerchantModel");

// get all
router.get('/', async (req, res) => {
    try {
        var merchants = await MerchantModel.find({}).exec();
        res.send(merchants);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get one
router.get('/:id', async (req, res) => {
    try {
        var merchant = await MerchantModel.findById(req.params.id).exec();
        res.send(merchant);
    } catch (error) {
        res.status(500).send(error);
    }
});

// create new
router.post("/", async (req, res) => {
    try {
        var merchant = new MerchantModel(req.body);
        var result = await merchant.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update existing
router.put("/:id", async (req, res) => {
    try {
        var merchant = await MerchantModel.findById(req.params.id).exec();
        merchant.set(req.body);
        var result = await merchant.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete one
router.delete("/:id", async (req, res) => {
    try {
        var result = await MerchantModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;