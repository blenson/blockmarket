const express = require("express");
const router = express.Router();

const StoreModel = require("../../models/Store/StoreModel");

// get all
router.get("/", async (req, res) => {
    try {
        if (req.auth.isMerchant !== true && req.auth.admin === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var stores = await StoreModel.find({ merchantId: req.auth.userid }).exec();
        res.send(stores);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get one
router.get("/:id", async (req, res) => {
    try {
        if (req.auth.isMerchant !== true && req.auth.admin === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var store = await StoreModel.findById(req.params.id).exec();
        if (req.auth.admin !== 0) {
            res.send(store);
        } else if (req.auth.isMerchant === true && store.merchantId === req.auth.userid) {
            res.send(result);
        } else {
            res.status(401).send("Not authorised");
        }

        res.send(store);
    } catch (error) {
        res.status(500).send(error);
    }
});

// create new
router.post("/", async (req, res) => {
    try {
        if (req.auth.isMerchant !== true && req.auth.admin === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var store = new StoreModel(req.body);
        if (req.auth.admin !== 0) {
            var result = await store.save();
            res.send(result);
        } else if (req.auth.isMerchant === true && store.merchantId === req.auth.userid) {
            var result = await store.save();
            res.send(result);
        } else {
            res.status(401).send("Not authorised");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// update existing
router.put("/:id", async (req, res) => {
    try {
        if (req.auth.isMerchant !== true && req.auth.admin === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var store = await StoreModel.findById(req.params.id).exec();
        store.set(req.body);
        if (req.auth.admin !== 0) {
            var result = await store.save();
            res.send(result);
        } else if (req.auth.isMerchant === true && store.merchantId === req.auth.userid) {
            var result = await store.save();
            res.send(result);
        } else {
            res.status(401).send("Not authorised");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete one
router.delete("/:id", async (req, res) => {
    try {
        if (req.auth.admin === 0) {
            res.status(401).send("Not authorised");
            return;
        }
        var result = await StoreModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
