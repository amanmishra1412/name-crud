const dotenv = require("dotenv");

dotenv.config();

const ENV_CONFIG = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = ENV_CONFIG;
