const loginModal = require("../models/loginUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV_CONFIG = require("../config/env");
const JWT_SECRET = ENV_CONFIG.JWT_SECRET;

exports.create = async (req, res) => {
    try {
        const { name, email, pass } = req.body;

        if (!name || !email || !pass) {
            return res.status(404).json({ msg: "All fields required" });
        }

        // Check existing user
        const existingUser = await loginModal.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ msg: "User already exists" });
        }

        // Hash password
        const hash = await bcrypt.hash(pass, 10);

        // Store
        const newUser = await loginModal.create({
            name,
            email,
            password: hash,
        });

        res.status(201).json({
            msg: "User registered successfully",
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ msg: "All fields required" });
        }
        const user = await loginModal.findOne({ email: email });
        if (!user) return res.status(404).json({ msg: "User Not Found" });

        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) return res.status(404).json({ msg: "Password Wrong" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            msg: "Login successful",
            token,
            user: { name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
