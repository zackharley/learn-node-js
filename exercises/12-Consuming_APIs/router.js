const express = require('express');
const request = require('request');
const home = require('./views/home');
const router = express.Router();

router.get('/', (req, res) => {
	res.send(`Please visit http://localhost:${port}/:username to see a user's GitHub information.`);
});

/* Put your code here */

module.exports = router;
