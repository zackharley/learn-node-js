const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

app.use(bodyParser.json());

// Ex: GET - http://localhost:3000/
app.get('/', (req, res) => {
	res.send('Hello index!');
});

// Ex: GET - http://localhost:3000/Zack
app.get('/:name', (req, res) => {
	const casing = req.query.case;

	if(casing === 'lower') {
		res.send(`Hello ${req.params.name.toLowerCase()}!`);
	} else if(casing === 'upper') {
		res.send(`Hello ${req.params.name.toUpperCase()}!`);
	} else {
		res.send(`Hello ${req.params.name}!`);
	}
});

// Ex: POST - http://localhost:3000/echo
app.post('/echo', (req, res) => {
	res.json(req.body);
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
