const mongoose = require("mongoose");

const nameSchema = mongoose.Schema({
    userName: String,
});

module.exports = mongoose.model("users", nameSchema);
