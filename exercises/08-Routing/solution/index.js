const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

app.use(bodyParser.json());

// Ex: GET - http://localhost:3000/
app.get('/', (req, res) => {
	res.set('Content-Type', 'text/plain');
	res.send('Hello index!');
});

// Ex: POST - http://localhost:3000/echo
app.post('/echo', (req, res) => {
	res.send(req.body);
});

// Ex: GET - http://localhost:3000/Zack
app.get('/:name', (req, res) => {
	const name = req.params.name;
	const casing = req.query.case;

	res.set('Content-Type', 'text/plain');

	if(casing === 'lower') {
		res.send(`Hello ${name.toLowerCase()}!`);
	} else if(casing === 'upper') {
		res.send(`Hello ${name.toUpperCase()}!`);
	} else {
		res.send(`Hello ${name}!`);
	}
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
