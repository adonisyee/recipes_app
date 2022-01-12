const express = require('express');
const router = express.Router();
const isLoggedIn = require('../utils/isLoggedIn');

router.get("/", (req, res) => {
	res.render("landing");
})

module.exports = router; 