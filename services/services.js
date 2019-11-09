const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const books = require("./routes/itemRoutes/bookRoute");

require("dotenv").config();
const PORT = process.env.SERVER_PORT || 4000;

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use("/api/books", books);

app.listen(PORT, function() {
    console.log("Our server is running on port " + PORT);
});
