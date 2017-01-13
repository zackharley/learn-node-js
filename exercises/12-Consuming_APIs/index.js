const express = require('express');
const request = require('request');
const home = require('./views/home');
const app = express();

/* Put code here */

app.listen(port, () => {
	console.log(`GitHub information grabber listening at http://localhost:${port}`);
})
