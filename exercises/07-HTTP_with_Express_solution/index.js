const express = require('express');
const app = express();

const port = 3000;

app.use((req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
