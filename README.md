# Learn Node.js {

> A workshop for the Software Developers Club (SDC) at Queen's University

## Contents
1. [Learning Goals](#learning-goals)
2. [Before We Begin](#before-we-begin)
3. [Introduction](#introduction)
4. [Exercises](#exercises)
5. [Weather App](#weather-app)
6. [Resources](#resources)
7. [Next Steps](#next-steps)
8. [License](#license)


## Learning Goals
- Become familiar with [Node.js](https://nodejs.org) and its APIs.
- Become familiar with [NPM](https://www.npmjs.com/)
- Become familiar with [Express.js](http://expressjs.com/)
- Learn how to consume a web API by making a weather appplication

## Before We Begin

You must make sure that you have [Node.js](https://nodejs.org) installed on your computer. In this workshop we will be using **Node.js v6.9.2 LTS**, but any version after that should work. To make sure that Node installed properly on your computer, you can check the version of Node that you are running using the following command from the command line:
```
$ node -v
```

Node.js installations also come with NPM, a package manager for JavaScript. Similarly to Node, you can make sure this installed correctly by checking the version you are running:

```
$ npm -v
```

You will also be making HTTP requests to the servers we create, so you will need a way to communicate those HTTP requests to the server. For GET requests, you can use your browser (everytime you navigate to a site with a browser it performs a GET request). For POST, DELETE, etc. requests you will need a library like [cURL](https://curl.haxx.se/) or a program like [Postman](). My personal recommendation is to use Postman since there is less of a learning curve if you are unfamiliar with CLIs.

### API Keys

We will be using several APIs in this workshop, so you'll want to make sure that you have working API keys. 

We will be getting weather data from [OpenWeatherMap](http://openweathermap.org/api). You will need to sign up for an account to be able to access an API key.

We will also be using an API key for the [Google Places API Web Service](https://developers.google.com/places/web-service/get-api-key).

Get the API keys for both of those APIs and make note of them. We'll be using them for the final project.

## Introduction

Node.js, as described on the [Node.js website](https://nodejs.org), is an "asynchronous event driven JavaScript runtime". Let's chop up this statement up into pieces to better understand what that means and explore a little deeper:

- **asynchronous**: Node takes advantage of *non-blocking I/O* to ensure faster speeds when executing JavaScript code. This fancy language means that if a Node program needs to get information from another file on your computer or from an API on the internet, that it starts the request for information, but doesn't stop program execution to wait for the information to return. We'll talk more about this later. For more reading, see Node.js' [Overview of Blocking vs Non-Blocking](https://github.com/nodejs/node/blob/master/doc/topics/blocking-vs-non-blocking.md).
- **event driven**: Node uses something called the *event loop* to allow for non-blocking I/O. Essentially, the event loop allows Node to unload I/O operations to the operating system so it can continue program execution. The event loop keeps track of I/O requests and resolves them when the request returns.
- **JavaScript runtime**: Node is built on top of the V8 JavaScript engine (originally built for Google Chrome), which it uses to compile and run JavaScript programs. 

### JavaScript with Node compared to C/C++

Some languages like C/C++ require you to compile your programs before you run them. Node takes care of that for you by compiling your JavaScript to machine code before it executes it, all in one step.

## Exercises

These exercises are designed to `<!-- TODO -->`

There are two folders for each exercise:

- **##-Exercise-Name** : The [boilerplate code](https://en.wikipedia.org/wiki/Boilerplate_code) necessary for the exercises is contained here. This is where you can write code as we progress through the workshop.
- **##-Exercise-Name_solution**: This folder contains __one possible solution__ to the problem. The solution in this folder is not necessarily the only possible solution, so keep that in mind.

**You are now ready to begin!**

### 01 - Hello World

> **Learning goal:** Learn how to write JavaScript for Node.js.

As the ritual goes, we'll start off with a 'Hello World!' example. In `index.js`, write:
```js
console.log('Hello World!');
```

This program uses the [console API](https://nodejs.org/api/console.html) provided by Node, which allows us to print to an output stream. We can execute this file by calling:
```
$ node index.js
```

The `node` command executes a supplied JavaScript file. Soon we'll see how to split our programs into different files, or modules, and how to import and export those modules so they can be used by Node. But first, another example.

> **NOTE:** There are a number of other Node.js APIs that give you more functionality than what is offered when writing JavaScript for the browser. While we will see some of the other APIs in this workshop, you can see a full list of APIs in the [Node.js documentation](https://nodejs.org/api/)

### 02 - Basic Addition

> **Learning goal:** To explore more of the Node.js APIs. 

Next, let's create a basic command line interface (CLI) that allows us to take two integers as inputs and print their sum to the command line. For example:
```
$ node sum.js 12 30
12 + 30 = 42
```

To be able to access arguments supplied to the program we will have to make use of the `process` API. This API gives us access to information about and control over the current Node process. The process info is available throught the global variable `process`. The property of `process` that we are going to use is `process.argv`. This is an array of arguments passed to Node when the precess was started. The zero-th index is always the path to the `node` executable file on your computer and the first index is the path to the file that is being executed. The remaining indices in the array are any other arguments supplied. For example:
```
$ node sum.js 12 30
```
would generate a `process.argv` similar to:
```javascript
['/path/to/node.exe', '/path/to/sum.js', '12', '30']
```

Notice that 12 and 30 are both strings. This means we will have to parse both of the strings. We can use `parseInt()` to change them from strings into integers:
```javascript
const numberOne = parseInt(process.argv[2]);
const numberTwo = parseInt(process.argv[3]);
```

To make sure our program handles incorrect input, we want to make sure that the two integers supplied are numbers. If they are not numbers (or NaNs) then we want to throw an error.
```javascript
if(isNaN(numberOne) || isNaN(numberTwo)) {
	throw new Error('You must supply two integers!');
}
```

If the two inputs pass the test, then we want to output their sum. We'll be using a [template literal](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals) to accomplish this. Instead of concatenating strings together with the `+` symbol like this:
```javascript
numberOne + ' + ' numberTwo + ' = ' + sum;
// < - '12 + 30 = 42'
```
were `sum = numberOne + numberTwo;`, we can use a template literal to insert the variables directly into the string:
```javascript
`${numberOne} + ${numberTwo} = ${sum}`;
// < - '12 + 30 = 42'
```

This code gets executed inside of an `else` statement:
```javascript
else {
	const sum = numberOne + numberTwo;
	console.log(`${numberOne} + ${numberTwo} = ${sum}`);
}
```

We can test that our program works correctly by testing that it outputs the correct sum. For example:
```
$ node sum.js 12 30
12 + 30 = 42
```

### 03 - Modules

> **Learning goal:** To understand how Node.js module system (a.k.a. CommonJS) works.

Once our program begins to grow in size, we'll want to begin to split the code into different files, or [**modules**](https://nodejs.org/api/modules.html). Modules are important for many reasons, some of which include

- They make reading code easier
- They are reusable and, therefore, reduce the duplication of code
- Allows us to decouple, or isolate, pieces of code from one another, meaning that breaking changes made to code in modules will usually have a lesser breaking effect than changes made to a large codebase in one file

You can read more on modules [here](http://eloquentjavascript.net/10_modules.html).

For our example on modules, we want to create a module called `arithmetic` that will perform basic addition and subtraction for us. This means that we want to create two functions:

#### add(a, b)

This function will take two numbers, and return their sum. For example:
```js
let num = add(4, 2);
console.log(num);
// <- 6
```

#### subtract(a, b)

This function will take two numbers, and return the difference of `a - b`. For example:
```js
let num  = subtract(4, 2);
console.log(num);
// <- 2
```

These functions will be declared in the `arithmetic.js` file. We will import that module into `index.js` so that we can make use of both `add` and `subtract`.

When we want to use an external module added to the project with a package manager like NPM, we can just specify the name of the the module (we'll see this soon). For this example, since we are creating our own module and it is a file in our project, we will want to specify a path to the file by adding a prefix (`/`, `./`, `../`) our module filename. 

- `/` gives an absolute path to a file. For example, a path that specifies `/users/zack/myModule.js` will look for `/users/zack/myModule.js`.
- `./` gives a relative path to a file, so a path that specifies `./myModule.js` will look for `myModule.js` in the current working directory. For example, if the current working directory is `/users/zack` and we want to get the file `/users/zack/myModule.js`, we can use the path `./myModule.js`.
- `../` gives a relative path to a file and is used to move up a level in the file system. For example, if the current working directory is `/users/zack/coding/` and I want to get the file `/users/zack/myModule.js`, we can use the path `../myModule.js`.

The Node module system allows us to omit the file extension for convenience when importing files with the extensions `.js`, `.json`, and `.node`, as well as files without a file extension. For example, if we want to import `/users/zack/myModule.js`, we can use the path `/users/zack/myModule`. Node will first check for a file called `myModule`, then check for `myModule.<file_extension>`, with the extensions `.js`, `.json`, and `.node`, in that order.

When using the `require` keyword, it's return value, will be whatever has been exported from the module. You almost always want to use `require` at the top of the file you are importing to so that you are able to use the imported code right away.

So to import our `arithmetic.js` module into `index.js`, our import statement will look like

```js
const arithmetic = require('./arithmetic');
```

We also have the specification in `index.js` that the `add` and `subtract` functions must be properties of the arithmetic module. This means that the `arithmetic` variable should look like

```js
const arithmetic = {
    add(a, b) {
        // add two numbers
    },
    subtract(a, b) {
        // subtract b from a
    }
}
```

Now that we know this, we can begin to create our custom module. There are two ways we can export the functions that we want:

- Using `module.exports` to specify an object to return
- Adding properties to `exports` to return

Let's first start by creating our add and subtract functions:

```js
function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}
```

Let's look at exporting the two functions using `module.exports`. Let's say we want to export the number 42 from a module so we can use it elsewhere:
```js
module.exports = 42;
```

If we require this module elsewhere, it will import the value 42. That's it! It's that easy. It can become more complicated when you need to export multiple things, but is still fairly straightforward.

To export the `add` and `subtract` functions, we can assign them as properties of an object and export the object.

```js
const stuffToExport = { add, subtract };

module.exports = stuffToExport;
```

or just

```js
module.exports = { add, subtract };
```

The `exports` keyword is a shorthand that allows us to export multiple things easily. Since `exports` is an Object, we can assign value to properties:

```js
exports.add = add;
exports.subtract = subtract;
```

> **NOTE:** If you assign `exports` to another Object (i.e. `exports = { a: 42 };`), whatever you've assigned it to will not be exported. See the [Node.js API docs](https://nodejs.org/api/modules.html) for more info.

My reccomendation is to use `exports` when you need to export multiple things from a module and `module.exports` when exporting just one thing.

We can test this module by running 

```
$ node index.js
```

### 04 - Synchronous I/O

> **Learning goal:** Understand how Node.js deals with file I/O

We talked about how Node performs non-blocking I/O. What I didn't mention, was that the Node APIs allow us to perform synchronous I/O (though you will want to avoid this at all cost). To get used to I/O we want to create a CLI that will count the occurences of a given colour in a given JSON file, as such:

```
$ node index.js colours.json green
There are 55 occurences of green in colours.json
Exiting
```

For this exercise, we will be using Node's File System API to perform I/O. This module has to be imported:
```js
const fs = require('fs');
```

Next, we want two inputs to our CLI, so we need to retrieve those from `process.argv`:

```js
const filename = process.argv[2];
const colourToCount = process.argv[3];
```

We first perform a check to ensure that both `filename` and `colourToCount` are non-empty strings. If they are non-empty we can proceed; if not, we throw an error:

```js
if(filename !== '' || colourToFind !== '') {
	// count colours
} else {
	throw new Error('You must supply a filename and a colour to count!')
}
```


To count the colours, we're going to want to use the [`readFileSync`](https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options) method on `fs` to import our list of colours. This will allow us to perform blocking I/O, meaning that the program will wait until the `readFileSync` function resolves until it completes anything else. Something to note about reading from a file with Node is that it returns the data as a Buffer (unless otherwise specified), so to make the data readable, we want convert it into a JSON object (since it is being read from a JSON file):

```js
const colours = JSON.parse(fs.readFileSync(filename));
```

Since our JSON file contains an array of colours, that is what is contained in `colours`.

We then want to initialize our `count` variable:

```js
let count = 0;
```

Next, we have to create a way of matching the `colourToCount` to the `colours`. The easiest way in my opinion is to use a [Regular Expression](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions) (RegExp); we want to create a case insensitive RegExp:

```js
const regexp = new RegExp(colourToCount, 'i');
```

Now that we have a way of matching the colours in the `colours` array, we can begin checking them. All we want to do is increment the count every time there is a match between the current colour and the `colourToCount`:

```js
colours.forEach(colour => {
	if(colour.match(regexp)) {
		count++;
	}
});
```

We then want to print a message depending on the count. If there are zero occurences, then we want to print that we were unable to find the colour they were looking for. If we find the colour at least once, they we want to print the count:

```js
if(count === 0) {
	console.log(`Unable to find "${colourToCount}" in ${filename}`);
} else {
	console.log(`There are ${count} occurences of ${colourToCount} in ${filename}`);
}
```


- talk about exit console statement `<!-- TODO -->`

### 05 - Asynchronous I/O

> **Learning goal:** `<!-- TODO -->`

- count the number of colour occurences in the file and output them to the command line
- talk about exit console statement

### 06 - Hello HTTP

> **Learning goal:** Understand how basic web servers work and how the client-server relationship is used on the Internet.

Before we make our first web server, we want to make sure we understand the underlying technology that allows web servers to communicate with the outside world. No doubt you have seen the letters HTTP (Hypertext Transfer Protocol) and HTTPS (HTTP Secure) on the internet when visiting different websites. These are both data communication protocols that specify how requests and responses are sent using the modern-day client-server relationship that most of the internet uses. When you go to [https://www.google.ca/](https://www.google.ca/), you are performing an HTTPS request to which Google's web servers respond with the HTML, CSS, and JavaScript files necessary to render the basic search engine page. To gain a better understanding of how web requests are communicated, see the [Anatomy of a Web Request](https://viacreative.co.uk/culture/anatomy-web-request).

HTTP and HTTPS requests use different "methods" to specify what action the server must take. Some common examples of these methods are GET, POST, and DELETE.

In this workshop we will only be dealing with HTTP as HTTPS requires more configuration and can be more difficult to understand. Node comes with its own HTTP API, so the first thing we'll want to do is import that:

```js
const http = require('http');
```

An important part of understanding how servers work is understanding the [different parts of a URL](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax). When you create a server using Node, you have to specify a port that traffic must pass through. In most cases, we can just use a port with a hight number like `3000` or `8888`.

```js
const port = 3000;
```

Now we can use the HTTP library's `createServer` method to initialize our server. When we call `http.createServer` it returns an instance of [`http.Server`](https://nodejs.org/api/http.html#http_class_http_server). We will pass it a function that takes a `http.ClientRequest` instance as the first input and a `http.ServerResponse` as the second input, usually called `req` and `res` for short. This function will be used to handle general requests that aren't handled by some other configuration. We want it to specify that every request will respond with the String `"Hello World!"`.

In the function, we want to specify a response code. A response code is attached to the HTTP response to tell the client whether its request was successful or not. Generally, 2xx response codes indicate success, 4xx represent client errors, and 5xx represent server errors. In our case we want all of our requests to return successfully, so we will use status code 200. 

We also want to set a response header in the function to tell the client that the output will be text. This means we have to set the `Content-Type` header to `text/plain`.

Finally, we want to send the message and terminate the response. We use 

```js
res.end('Hello World!');
```

to send the message, which is equivalent to 

```js
res.write('Hello World!');
res.end();
```

The final `createServer` call looks like this:

```js
const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World!');
});
```

This gives us a server that we can use, but to make use of it, we need to tell it to listen on a specific port. We will use the `listen` method on the `server` that was created to begin listening on a port. `listen` also takes an optional function which gets called when the server is successfully running. I usually like to log what port the server is running on in this function:

```js
server.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
```

We can run the server using

```
$ node index.js
Server running on http://localhost:3000
```

If you open a browser and go to [`http://localhost:3000`](http://localhost:3000), you should see the text "Hello World!".

### 07 - HTTP with Express.js

> **Learning goal:** Gain an understanding of how to create an Express.js server as well as how to use NPM.

[Express.js](https://expressjs.com/) is a "fast, unopinionated, minimalist web framework for Node.js". This framework builds on Node's existing HTTP and HTTPS libraries, allowing for improvements on ease of use.

In this exercise we will be creating the same server as in Exercise 06, but using the Express framework. Since Express is an external package we will have to use a package manager (in this case NPM, which comes with Node) to install it.

To install Express, go to your command line and type
```
$ npm install express
```

After this successfully completes, you will see a `node_modules` folder. This contains the files for Express and any other modules that it depends on (as well as any other modules you would install to this project and their dependencies).

We now have Express installed, but what would happen if we were to delete the `node_modules` folder? We would have to use

```
$ npm install express
```

again to install Express. For arguments sake, what happens if we're working on a project that has 100 modules that need to be installed? We would have to install each of them:

```
$ npm install module_one module_two ... module_one_hundred
```

This might not seem like a lot of work if you only have to do it once in your project, but consider this: it is poor practice to commit your `node_modules` folder to version control (i.e. Git, SVN, etc.). That means that if want to write code for this 100 module project on 10 different computers, you would have to type out the above command 10 times. This would become inefficient fairly quickly. Luckily, NPM can use a config file, calles `package.json`, to store information about your project and its dependencies.

NPM makes it very easy to create these `package.json` files by using its CLI:

```
npm init
```

You can go through the prompts here and this will create you a `package.json`. Most of the fields that you are asked to fill out aren't particularly relevant to our discussion, but this is the easiest way to create a `package.json`. After the `package.json` is created, we can begin to specify which modules our application will depend on. In our case we only need Express. We can modify our previous install statement slightly to save our dependency:

```
$ npm intall --save express
```


After doing this, you should see a `package.json` similar to this:

```json
{
    "name": "http_with_express",
    ...,
    "dependencies": {
        "express": "^4.14.0"
    }
}
```

As long as you commit the `package.json` to you version control, in the future all you have to do is

```
$ npm install
```

to install **all of the project's dependencies**.

You can read more about the specifications of the `package.json` file in the [NPM documentation](https://docs.npmjs.com/files/package.json).

Now that we have Express installed and saved as a dependency, we can begin to write code for our server. The first thing we want to do is import Express:

```js
const express = require('express');
```

We can then create a new Express app:

```js
const app = express();
```

Similarly to the last Exercise, we need to declare a port:

```js
const port = 3000;
```

Next, we want to define a catch-all function that will handle every response to our server and return the plain text "Hello World!":

```js
app.use((req, res) => {
	res.set('Content-Type', 'text/plain');
	res.send('Hello World!');
});
```

Just like `server.listen` in Exercise 06, `app.listen` will start our server and execute the specified function:

```js
app.listen(port, () => {
	console.log(`Express server running on http://localhost:${port}`);
});
```

Now we can run our server:

```
$ node index.js
```

and check our browser to ensure that it is responding with the correct information.

### 08 - Routing

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

Let's start by getting the general layout of the middleware. Again, we only was to respond to GET requests, so we will use `app.get`. We also know the path for this endpoint. **NOTE:** You do not specify query parameters in the path you supply to Express.

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

***
Now that we have all three of our routes defined, we can tell the server to begin listening for requests:

```js
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
```

That's it! We can now test our routes to make sure that they have been made properly.

### 09 - Routing with Router

> **Learning goal:** `<!-- TODO -->`

- move routing to a `routes.js`

### 10 - Static Files

> **Learning goal:** `<!-- TODO -->`

### 11 - Middleware

> **Learning goal:** `<!-- TODO -->`

- Create our own middleware generate request logs [Apache log](http://ossec-docs.readthedocs.io/en/latest/log_samples/apache/apache.html)

### 12 - Consuming APIs

> **Learning goal:** `<!-- TODO -->`

- Use GitHub as an example

## Weather App
- Read cities from a file
- GET weather data for those cities
- return data to be displayed on the client
- if we add cities, write them to file
- if we delete cities, rewrite the list to file.
- CRUD API design

TALK ABOUT CALLBACK PATTERN AND HOW TO REDUCE CALLBACK HELL

## Resources

- http://node.green/ - Used to see what ECMAScript (e.g. ES6) features have been implemented in Node.js

## Next Steps

- [Yarn Package Manager](https://yarnpkg.com/)
- [Webpack](https://webpack.js.org/)
- Front-end frameworks like [React](https://facebook.github.io/react/) and [Angular](https://angularjs.org/)
- Deploying web apps ([AWS](https://aws.amazon.com/), [GCS](https://cloud.google.com/), [Zeit Now](https://zeit.co/now), [Heroku](https://www.heroku.com/nodejs))


## License
2016 © [Zack Harley](https://github.com/zackharley)
> :fork_and_knife:Fork away!

# }
