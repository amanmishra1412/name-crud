const express = require("express");
const router = express.Router();
const { create } = require("../controllers/login.controller");

router.post("/register", create);

module.exports = router;
