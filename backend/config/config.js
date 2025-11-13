const mongoose = require("mongoose");
const ENV_CONFIG = require("./env");
const mongoURI = ENV_CONFIG.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        // console.log("Yes");
    } catch (err) {
        console.log("Connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
