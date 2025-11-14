const express = require("express");
const app = express();
const cors = require("cors");
const conn = require("./config/config");
const nameroute = require("./routes/home");
conn();
const ENV_CONFIG = require("./config/env");
const port = ENV_CONFIG.PORT || 10000;

// Middleware
app.use(
    cors({
        origin: "*", // testing ke liye, later specific frontend URL bhi use kar sakte ho
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", nameroute);

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(port);
