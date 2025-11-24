const loginModal = require("../models/loginUser");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
    try {
        const { name, email, pass } = req.body;

        if (!name || !email || !pass) {
            return res.status(400).json({ msg: "All fields required" });
        }

        // Check existing user
        const existingUser = await loginModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
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
