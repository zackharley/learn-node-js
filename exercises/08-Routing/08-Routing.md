[To previous lesson](/exercises/07-HTTP_with_Express/07-HTTP_with_Express.md)

# 08 - Routing

> **Learning goal:** Create basic routes and understand how basic APIs can be created.

In this example, we want to design a more robust server that has different paths, or routes, that provide different functionality. The routes that we want to implement are:

1. GET `/` - Respond with the text `'Hello index!'`
2. GET `/:name?casing=case` - Respond with the text `` `Hello ${name}` ``, where name is specified as a URL paramater when making a request and name has been set to the correct case as specified by the `casing` query.
3. POST `/echo` - This endpoint will respond with the body of the request.

Before we begin, we need to import our dependencies (don't forget to create a `package.json` and save your dependencies!). For this exercise, we will continue to use Express, but will also use a module called [body-parser](https://github.com/expressjs/body-parser). This module will allow us to parse JSON requests made to our `/echo` endpoint:

```js
const express = require('express');
const bodyParser = require('body-parser');
```

We also need to create our basic Express `app`:

```js
const app = express();
```

The last thing to setup before our routes is our port number:

```js
const port = 3000;
```

#### GET `/`

We can modify our catch-all function from the previous example to achieve what we want for the `/` route here. First, we have to do is modify the text:

```js
app.use((req, res) => {
	res.set('Content-Type', 'text/plain');
	res.send('Hello index!');
});
```

When using `app.use`, this allows us to have this middleware apply to all of the HTTP verbs (e.g. GET, PUT, DELETE, POST). In our case, we only want to be able to accept GET requests, so let's change `app.use` to `app.get`:

```js
app.get((req, res) => {
	res.set('Content-Type', 'text/plain');
	res.send('Hello index!');
});
```

Finally, we want to make sure that only requests made to `/` are handled by this middleware. To do this, we add an argument to `app.get`, before our function that handles the request. That argument is the path that we want to handle:

```js
app.get('/', (req, res) => {
	res.set('Content-Type', 'text/plain');
	res.send('Hello index!');
});
```

Now we have the middleware in place to be able to handle a GET request to `/`.

#### POST `/echo`

The aptly named `echo` route will return the respond to any POST requests by returning the body of the request. Because we have the Body Parser middleware in use, any POST request body will be parsed from a string into JSON. This means that our `/echo` route can only receive a JSON body to return the correct data. 

This route is relatively simple, but is our first introduction to POST routes. Since we are only responding to POST requests, we want to use `app.post`. We need to supply `app.post` with the `/echo` URL and the function to handle requests. The function will respond to the request with the request's body.

```js
app.post('/echo', (req, res) => {
	res.send(req.body);
});
```

#### GET `/:name?casing=case`

For this route, we will be using URL query strings and parameters to achieve the result that we want. 

Query strings are used to specify data that does not fit within the hierarchy of a normal URL. Query string are at the end of a URL and always begin with a question mark. A query in a query string is a key-value pair, which is separated by a `=`. If there are multiple queries in the query string, then they are separated by a `&` symbol. An example of a query string that could be used to recieve a term to search and a language to search in is

```
http://example.com/search?q=Node&lang=en
```

URL parameters allow you to use the URL hierarchy to specify data for a request. When looking at API documentation or specifying URLs in Express, you can tell the difference between a parameter and a path on a url, by the way they are expressed: `/path` vs. `/:parameter`. An example of a URL parameter that could be used to retrieve user data is

```
http://example.com/users/:username
```

URL queries and parameters are both accessible through the `req` object in Express, using `req.query.<query_name>` and `req.params.<param_name>`, respectively.

Since we know that our path is `/:name?casing=case`, we know that we can access the following variables:

```js
req.params.name
req.query.casing
```

The whole purpose of this route is to respond to any GET request by saying "Hello" to the specified name, using the specified casing. The casings that we want to support are `upper` and `lower`. If a case is not specified, then we want to say "Hello" to the name, as-is. Some example calls are:

GET `/Zack?casing=lower`, which produces

```
Hello zack!
```

GET `/zack?casing=upper`, which produces

```
Hello ZACK!
```

GET `/ZaCk`, which produces

```
Hello ZaCk!
```

Let's start by getting the general layout of the middleware. Again, we only was to respond to GET requests, so we will use `app.get`. We also know the path for this endpoint. 

>**NOTE:** You do not specify query parameters in the path you supply to Express.

```js
app.get('/:name', (req, res) => {
    // Say Hello here!
});
```

Now let's get the name and the casing we want to use:

```js
app.get('/:name', (req, res) => {
	const name = req.params.name;
	const casing = req.query.case;
});
```

We also know that we're returning text, so let's set the `Content-Type` header:

```js
app.get('/:name', (req, res) => {
	const name = req.params.name;
	const casing = req.query.case;

	res.set('Content-Type', 'text/plain');
});
```

We now want to deal with our three `casing` scenarios:

```js
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
```

> **NOTE:** The order in which you declare your routes is the order in which incoming requests will be routed, i.e. if we declare a GET route for `/:name` before we declare GET `/hello`, any request meant for `/hello` would go to `/:name` first.

Now that we have all three of our routes defined, we can tell the server to begin listening for requests:

```js
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
```

That's it! We can now test our routes to make sure that they have been made properly. Start the server with 

```js
node index.js
```

[To next lesson](/exercises/09-Routing_with_Router/09-Routing_with_Router.md)
