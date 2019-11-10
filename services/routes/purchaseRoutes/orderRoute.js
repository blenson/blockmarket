const express = require("express");
const router = express.Router();

const OrderModel = require("../../models/Purchase/OrderModel");

// get all
router.get('/', async (req, res) => {
    try {
        var orders = await OrderModel.find({}).exec();
        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get one
router.get('/:id', async (req, res) => {
    try {
        var order = await OrderModel.findById(req.params.id).exec();
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// create new
router.post("/", async (req, res) => {
    try {
        var order = new OrderModel(req.body);
        var result = await order.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update existing
router.put("/:id", async (req, res) => {
    try {
        var order = await OrderModel.findById(req.params.id).exec();
        order.set(req.body);
        var result = await order.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete one
router.delete("/:id", async (req, res) => {
    try {
        var result = await OrderModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
