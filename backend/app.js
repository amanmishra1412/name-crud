const express = require("express");
const app = express();
const cors = require("cors");
const conn = require("./config/config");
const nameroute = require("./routes/home");
const loginRoute = require("./routes/login");

conn();
const ENV_CONFIG = require("./config/env");
const port = ENV_CONFIG.PORT || 10000;

// Middleware
app.use(
    cors({
        origin: ["http://localhost:5173", "https://name-crud.vercel.app"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", nameroute);
app.use("/auth", loginRoute);

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(port);
