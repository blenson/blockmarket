const express = require("express");
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;


const OrderModel = require("../../models/Purchase/OrderModel");

// get all
router.get("/", async (req, res) => {
    try {
        if (req.auth.admin !== 0) {
            var orders = await OrderModel.find({}).exec();
            res.send(orders);
        } else if (req.auth.isMerchant === true) {
            var orders = await OrderModel.find({ merchantId: req.auth.userid }).exec();
            res.send(orders);
        } else {
            var orders = await OrderModel.find({ buyerId: req.auth.userid }).exec();
            res.send(orders);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// get next order id
router.get("/nextorderid", async (req, res) => {
    try {
        res.send(ObjectID());
    } catch (error) {
        res.status(500).send(error);
    }
});

// get one
router.get("/:id", async (req, res) => {
    try {
        var order = await OrderModel.findById(req.params.id).exec();
        if (req.auth.admin !== 0) {
            res.send(order);
        } else if (req.auth.isMerchant === true && order.merchantId === req.auth.userid) {
            res.send(orders);
        } else if (req.auth.isMerchant !== true && order.buyerId === req.auth.userid) {
            res.send(orders);
        } else {
            res.status(401).send("Not authorised");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// create new
router.post("/", async (req, res) => {
    try {
        var order = new OrderModel(req.body);
        if (req.auth.admin !== 0) {
            var result = await order.save();
            res.send(result);
        } else if (req.auth.isMerchant === true && order.merchantId === req.auth.userid) {
            var result = await order.save();
            res.send(result);
        } else if (req.auth.isMerchant !== true && order.buyerId === req.auth.userid) {
            var result = await order.save();
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
        var order = await OrderModel.findById(req.params.id).exec();
        order.set(req.body);
        if (req.auth.admin !== 0) {
            var result = await order.save();
            res.send(result);
        } else if (req.auth.isMerchant === true && order.merchantId === req.auth.userid) {
            var result = await order.save();
            res.send(result);
        } else if (req.auth.isMerchant !== true && order.buyerId === req.auth.userid) {
            var result = await order.save();
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
        var result = await OrderModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
