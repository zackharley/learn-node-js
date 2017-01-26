[To previous lesson](/exercises/08-Routing/08-Routing.md)

# 09 - Routing with Router

> **Learning goal:** Understand how to modularize your routes to make your code cleaner.

In this exercise we will be moving our routes from Exercise 8 into a seperate `router.js` file in order to de-clutter our `index.js` file. 

#### `index.js`
Like in Exercise 8, we want to import Express and Body Parser, but we also want to import our `router.js` file so we can make use of the routes that will be contained there.

```js
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
```

Next we want to declare our Express `app` and our `port`:

```js
const app = express();
const port = 3000;
```

We then want to initialize the JSON Body Parser:

```js
app.use(bodyParser.json());
```

This is the part of `index.js` that changes from Exercise 8; we want to replace our three route declarations with the following line:

```js
app.use(router);
```

This tells the Express app to look at the `router` module to see how to perform request routing.

Finally, we tell our server to listen:

```js
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
```

#### `router.js`

This file is going to contain all of our Express routes. To create a router, we want to first import Express:

```
const express = require('express');
```

then create a new instance of `Router`:
```
const router = express.Router();
```


> "[An instance of `Router` ] is an isolated instance of middleware and routes. You can think of it as a 'mini-application,' capable only of performing middleware and routing functions. Every Express application has a built-in app router." --- [Express.js Documentation](https://expressjs.com/en/api.html#router)

This means that we can create a specific set of middleware and routes, optimizing a project's modularity. Since `router` is like a smaller version of `app`, we can declare routes in the same way. Since we are declaring the same three routes as Exercise 8, I will just show their declaration and not go into detail:

```js
router.get('/', (req, res) => {
	res.send('Hello index!');
});

router.post('/echo', (req, res) => {
	res.send(req.body);
});

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
```

Finally, we want to export our `router`:

```js
module.exports = router;
```

Our server will function the same as in Exercise 8, but now we have two smaller and easier to read files!

[To next lesson](/exercises/10-Static_files/10-Static_files.md)
