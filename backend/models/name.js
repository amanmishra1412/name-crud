const mongoose = require("mongoose");

const nameSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Users", nameSchema);
