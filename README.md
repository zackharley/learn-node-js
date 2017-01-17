# Learn Node.js {

> A workshop for the Software Developers Club (SDC) at Queen's University

## Contents
1. [Learning Goals](#learning-goals)
2. [Before We Begin](#before-we-begin)


## Learning Goals
- Become familiar with [Node.js](https://nodejs.org) and its APIs.
- Become familiar with [NPM](https://www.npmjs.com/)
- Become familiar with [Express.js](http://expressjs.com/)
- Learn how to consume a web API (weather appplication)

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

When using the `require` keyword, it's return value, will be whatever has been exported from the module.

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

```js
node index.js
```

### 04 - Synchronous I/O

> **Learning goal:** Understand how Node.js deals with file I/O

W

- count the number of colour occurences in the file and output them to the command line
- talk about exit console statement

### 05 - Asynchronous I/O

> **Learning goal:** `<!-- TODO -->`

- count the number of colour occurences in the file and output them to the command line
- talk about exit console statement

### 06 - Hello HTTP

> **Learning goal:** `<!-- TODO -->`

- What is HTTP? What is HTTPS?
- Anatomy of an HTTP request
- HTTP verbs
- CRUD API design
- HTTP status codes

Before we make our first web server, we want to make sure we understand the underlying technology that allows web servers to communicate with the outside world. No doubt you have seen the letters HTTP (Hypertext Transfer Protocol) and HTTPS (HTTP Secure) on the internet when visiting different websites. These are both data communication protocols that specify how requests and responses are sent using the modern-day client-server relationship that most of the internet uses. When you go to [https://www.google.ca/](https://www.google.ca/), you are performing an HTTPS request to which Google's web servers respond with the HTML, CSS, and JavaScript files necessary to render the basic search engine page. To gain a better understanding of how web requests are communicated, see the [Anatomy of a Web Request](https://viacreative.co.uk/culture/anatomy-web-request).

HTTP and HTTPS requests use different "methods" to specify what action the server must take. Some common examples of these methods are GET, POST, and DELETE.

In this workshop we will only be dealing with HTTP as HTTPS requires more configuration and can be more difficult to understand. 

### 07 - HTTP with Express.js

> **Learning goal:** `<!-- TODO -->`

- Hello world with Express

### 08 - Routing

> **Learning goal:** `<!-- TODO -->`

- route in `index.js`

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

TALK ABOUT CALLBACK PATTERN AND HOW TO REDUCE CALLBACK HELL

## Resources

- http://node.green/
- http://callbackhell.com/

## Next Steps

- Yarn Package Manager
- Webpack
- Front-end frameworks like React and Angular
- Deploying web apps (AWS, GCS, Zeit Now, Heroku)
- Testing with ngrok


## License
2016 © [Zack Harley](https://github.com/zackharley)
> :fork_and_knife:Fork away!

# }
