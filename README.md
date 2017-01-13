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

Node.js, as described on the [Node.js website](https://nodejs.org), is an "asynchronous event driven JavaScript runtime". Let's chop up this statement up into pieces to better understand what that means and explore a little deaper:

- **asynchronous**: Node takes advantage of *non-blocking I/O* to ensure faster speeds when executing JavaScript code. This fancy language means that if a Node program needs to get information from another file on your computer or from an API on the internet, that it starts the request for information, but doesn't stop program execution to wait for the information to return. We'll talk more about this later. For more reading, see Node.js' [Overview of Blocking vs Non-Blocking](https://github.com/nodejs/node/blob/master/doc/topics/blocking-vs-non-blocking.md).
- **event driven**: Node uses something called the *event loop* to allow for non-blocking I/O. Essentially, the event loop allows Node to unload I/O operations to the operating system so it can continue program execution. The event loop keeps track of I/O requests and resolves them when the request returns.
- **JavaScript runtime**: Node is built on top of the V8 JavaScript engine (originally built for Google Chrome), which it uses to compile and run JavaScript programs. 

### JavaScript with Node compared to C/C++

Some languages like C/C++ require you to compile your programs before you run them. Node takes care of that for you by compiling your JavaScript to machine code before it executes it, all in one step.

## Exercises

These exercises are designed to 

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

### 02 - Basic Addition

> **Learning goal:** To explore more of the Node.js APIs. 

Next, let's create a basic command line interface (CLI) that allows us to take 
two integers as inputs and print their sum to the command line. For example:
```
$ node sum.js 12 30
12 + 30 = 42
```

To be able to access arguments supplied to the program we will have to make use of the `process` API. This API gives us access to information about, and control over, the current Node process. The proces info is available throught the global variable `process`. The property of `process` that we are going to use is `process.argv`. This is an array of arguments passed to Node when the precess was started. The zero-th index is always the path to the `node` executable file on your computer and the first index is the path to the file that is being executed. The remaining indices in the array are any other arguments supplied. For example:
```
$ node sum.js 12 30
```
Would generate a `process.argv` similar to:
```javascript
['/path/to/node.exe', '/path/to/sum.js', '12', '30']
```

Notice that 12 and 30 are both strings. This means we will have to parse both of the strings. We can use `parseInt()` to change them from strings into integers:
```javascript
const numberOne = parseInt(process.argv[2]);
const numberTwo = parseInt(process.argv[3]);
```

To make sure our program handles incorrect input, we want to make sure that the two integers supplied are numbers. If they are not numbers (or NaNs), then we want output an error to the `error` stream of the `console` API.
```javascript
if(isNaN(numberOne) || isNaN(numberTwo)) {
	console.error('You must supply two integers!');
}
```

If the two inputs pass the test, then we want to output their sum. We'll be using a [template literal](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals) to accomplish this. Instead of concatenating string together with th `+` symbol like this:
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
### 03 - Modules

> **Learning goal:** To understand how Node.js module system (a.k.a. CommonJS) works.

Once our program begins to grow in size, we'll want to begin to split the code into different files, or **modules**. Modules are important for many reasons, some of which include

- They make reading code easier
- They are reusable
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

This function

This will be written in the `arithmetic.js` file. We will import that module into `index.js` so that we can 

- add/subtract function in our own `arithmatic` module
- introduce `module.exports` and `export.*`


### 04 - Synchronous I/O

> **Learning goal:** 

- count the number of colour occurences in the file and output them to the command line
- talk about exit console statement

### 05 - Asynchronous I/O

> **Learning goal:** 

- count the number of colour occurences in the file and output them to the command line
- talk about exit console statement

### 06 - Hello HTTP

> **Learning goal:** 

- What is HTTP? What is HTTPS?
- Anatomy of an HTTP request
- HTTP verbs
- CRUD API design
- HTTP status codes

Before we make our first web server, we want to make sure we understand the underlying technology that allows web servers to communicate with the outside world. No doubt you have seen the letters HTTP (Hypertext Transfer Protocol) and HTTPS (HTTP Secure) on the internet when visiting different websites. These are both data communication protocols that specify how requests and responses are sent using the modern-day client-server relationship that most of the internet uses. When you go to [https://www.google.ca/](https://www.google.ca/), you are performing an HTTPS request to which Google's web servers respond with the HTML, CSS, and JavaScript files necessary to render the basic search engine page. To gain a better understanding of how web requests are communicated, see the [Anatomy of a Web Request](https://viacreative.co.uk/culture/anatomy-web-request).

HTTP and HTTPS requests use different "methods" to specify what action the server must take. Some common examples of these methods are GET, POST, and DELETE.

In this workshop we will only be dealing with HTTP as HTTPS requires more configuration and can be more difficult to understand. 

### 07 - HTTP with Express.js

> **Learning goal:** 

- Hello world with Express

### 08 - Routing

> **Learning goal:** 

- route in `index.js`

### 09 - Routing with Router

> **Learning goal:** 

- move routing to a `routes.js`

### 10 - Static Files

> **Learning goal:** 

### 11 - Middleware

> **Learning goal:** 

- Create our own middleware generate request logs [Apache log](http://ossec-docs.readthedocs.io/en/latest/log_samples/apache/apache.html)

### 12 - Consuming APIs

> **Learning goal:** 

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
