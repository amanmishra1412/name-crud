require("dotenv").config();

const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

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
