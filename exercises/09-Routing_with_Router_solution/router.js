const express = require('express');
const router = express.Router();

// Ex: GET - http://localhost:3000/
router.get('/', (req, res) => {
	res.send('Hello index!');
});

// Ex: POST - http://localhost:3000/echo
router.post('/echo', (req, res) => {
	res.send(req.body);
});


// Ex: GET - http://localhost:3000/Zack
router.get('/:name', (req, res) => {
	const casing = req.query.case;

	if(casing === 'lower') {
		res.send(`Hello ${req.params.name.toLowerCase()}!`);
	} else if(casing === 'upper') {
		res.send(`Hello ${req.params.name.toUpperCase()}!`);
	} else {
		res.send(`Hello ${req.params.name}!`);
	}
});

module.exports = router;
