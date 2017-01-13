const express = require('express');
const logger = require('./logger');
const app = express();

const port = 3000;

/* apply the logger here */

app.use(express.static('public'));

app.listen(port, () => {
	console.log(`Server with middleware listening on http://localhost:${port}`);
});
