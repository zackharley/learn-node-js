const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const app = express();

const port = 3000;

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/dist/public')));
app.use(router);

app.listen(port, () => {
	console.log(`Weather app is listening on http://localhost:${port}`);
});
