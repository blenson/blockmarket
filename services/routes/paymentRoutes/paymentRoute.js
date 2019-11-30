const express = require("express");
const router = express.Router();
const configureStripe = require("stripe")

router.post("/", async (req, res) => {
    try {

        let stripe = configureStripe(process.env.STRIPE_SK);
        let details = req.body;

        let { status } = await stripe.charges.create({
            amount: details.amount,
            currency: details.currency,
            description: details.description,
            source: details.source
        });
        res.send(status);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
