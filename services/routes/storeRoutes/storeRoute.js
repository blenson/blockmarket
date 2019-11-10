const express = require("express");
const router = express.Router();

const StoreModel = require("../../models/Store/StoreModel");

// get all
router.get('/', async (req, res) => {
    try {
        var stores = await StoreModel.find({}).exec();
        res.send(stores);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get one
router.get('/:id', async (req, res) => {
    try {
        var store = await StoreModel.findById(req.params.id).exec();
        res.send(store);
    } catch (error) {
        res.status(500).send(error);
    }
});

// create new
router.post("/", async (req, res) => {
    try {
        var store = new StoreModel(req.body);
        var result = await store.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update existing
router.put("/:id", async (req, res) => {
    try {
        var store = await StoreModel.findById(req.params.id).exec();
        store.set(req.body);
        var result = await store.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete one
router.delete("/:id", async (req, res) => {
    try {
        var result = await StoreModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
