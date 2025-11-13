const nameModal = require("../models/name");

exports.create = async (req, res) => {
    try {
        const nameCreate = await nameModal.create({
            userName: req.body.userName,
        });
        res.status(201).json(nameCreate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.fetchAll = async (req, res) => {
    try {
        const names = await nameModal.find();
        res.json(names);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.fetchOne = async (req, res) => {
    try {
        console.log(req.params);
        const singleNAme = await nameModal.findOne({ _id: req.params.id });
        res.json(singleNAme);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOne = async (req, res) => {
    try {
        const updatedName = await nameModal.findByIdAndUpdate(
            req.params.id,
            { userName: req.body.userName },
            { new: true }
        );
        res.status(200).json(updatedName);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOne = async (req, res) => {
    try {
        console.log(req.params);
        const singleNAme = await nameModal.findByIdAndDelete(req.params.id);
        res.json(singleNAme);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
