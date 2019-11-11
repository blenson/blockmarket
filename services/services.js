const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors = require("cors");

// pull in the routes
const books = require("./routes/itemRoutes/bookRoute");
const merchants = require("./routes/userRoutes/merchantRoute");
const buyers = require("./routes/userRoutes/buyerRoute");
const stores = require("./routes/storeRoutes/storeRoute");
const orders = require("./routes/purchaseRoutes/orderRoute");

dotenv.config();

app.use(cors());

// we'll use bodyparser to pull json data from our REST services
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to MongoDB
mongoose.connect(process.env.DB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use our routes
app.use("/api/books", books);
app.use("/api/merchants", merchants);
app.use("/api/buyers", buyers);
app.use("/api/stores", stores);
app.use("/api/orders", orders);

// kick off our server
const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, function() {
    console.log("Our server is running on port " + PORT);
});
