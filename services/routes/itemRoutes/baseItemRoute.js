const express = require("express");
const router = express.Router();
const itemModel = require("../models/ItemModel");

router.get('/', function (req, res, next) {
    itemModel.find({}, function(err,items) {
        let itemData = items.map(item => {
            return {
              _id: item._id,
              title: item.title,
              genre: item.genre,
              desc: item.desc,
              price: parseFloat(item.price)
            }
          })
        res.status = 200;
        res.json(itemData)
    });
})

module.exports = router;
