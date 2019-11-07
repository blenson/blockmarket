const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const items = require("./routes/items");

require("dotenv").config();
const PORT = process.env.SERVER_PORT || 4000;

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use("/api/items", items);

app.listen(PORT, function() {
    console.log("Our server is running on port " + PORT);
});
