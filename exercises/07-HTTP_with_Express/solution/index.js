const express = require('express');
const app = express();

const port = 3000;

app.use((req, res) => {
	res.set('Content-Type', 'text/plain');
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Express server running on http://localhost:${port}`);
});
