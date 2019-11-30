const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
var cookieParser = require("cookie-parser");

// pull in the routes
const books = require("./routes/itemRoutes/bookRoute");
const merchants = require("./routes/userRoutes/merchantRoute");
const buyers = require("./routes/userRoutes/buyerRoute");
const stores = require("./routes/storeRoutes/storeRoute");
const orders = require("./routes/purchaseRoutes/orderRoute");
const auth = require("./routes/authRoutes/authRoute");
const payments = require("./routes/paymentRoutes/paymentRoute");

dotenv.config();

app.use(cookieParser());

let corsOptions = {
    origin: "https://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// open up the /images folder for static resources
app.use("/images", express.static(__dirname + "/images"));

// we'll use bodyparser to pull json data from our REST services
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to MongoDB
mongoose.connect(process.env.DB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(passport.initialize());
require("./secure/jwtCheck")(passport);

// use our routes
app.use("/api/books", books);
app.use("/api/merchants", merchants);
app.use("/api/buyers", buyers);
app.use("/api/stores", passport.authenticate("jwt", { session: false }), stores);
app.use("/api/orders", passport.authenticate("jwt", { session: false }), orders);
app.use("/api/auth", auth);
app.use("/api/payment", payments);

const httpsOptions = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
    requestCert: false,
    rejectUnauthorized: false
};

// kick off our server
const PORT = process.env.SERVER_PORT || 4000;

var httpsServer = https.createServer(httpsOptions, app);
console.log("Our server is running on port " + PORT);
httpsServer.listen(PORT);
