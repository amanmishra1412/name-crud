const express = require("express");
const nameModal = require("../models/name");
const routes = express.Router();
const {
    create,
    fetchAll,
    fetchOne,
    deleteOne,
    updateOne,
} = require("../controllers/name");

routes.get("/", async (req, res) => {
    res.send("route");
});

routes.post("/create", create);

routes.get("/fetch", fetchAll);
routes.put("/update/:id", updateOne);
routes.get("/fetch/:id", fetchOne);
routes.delete("/delete/:id", deleteOne);

module.exports = routes; // export router object
