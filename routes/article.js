const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/new", (req, res) => {
	res.render("articles/new");
});

router.post("/", (req, res) => {
	res.send("Create article");
});
