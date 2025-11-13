const dotenv = require("dotenv");

dotenv.config();

const ENV_CONFIG = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
};

module.exports = ENV_CONFIG;
