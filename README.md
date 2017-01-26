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

***

## Learning Goals
- Become familiar with [Node.js](https://nodejs.org) and its APIs.
- Become familiar with [NPM](https://www.npmjs.com/)
- Become familiar with [Express.js](http://expressjs.com/)
- Learn how to consume a web API by making a weather appplication

***

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

***

## Introduction

Node.js, as described on the [Node.js website](https://nodejs.org), is an "asynchronous event driven JavaScript runtime". Let's chop up this statement up into pieces to better understand what that means and explore a little deeper:

- **asynchronous**: Node takes advantage of *non-blocking I/O* to ensure faster speeds when executing JavaScript code. This fancy language means that if a Node program needs to get information from another file on your computer or from an API on the internet, that it starts the request for information, but doesn't stop program execution to wait for the information to return. We'll talk more about this later. For more reading, see Node.js' [Overview of Blocking vs Non-Blocking](https://github.com/nodejs/node/blob/master/doc/topics/blocking-vs-non-blocking.md).
- **event driven**: Node uses something called the *event loop* to allow for non-blocking I/O. Essentially, the event loop allows Node to unload I/O operations to the operating system so it can continue program execution. The event loop keeps track of I/O requests and resolves them when the request returns.
- **JavaScript runtime**: Node is built on top of the V8 JavaScript engine (originally built for Google Chrome), which it uses to compile and run JavaScript programs. 

### JavaScript with Node compared to C/C++

Some languages like C/C++ require you to compile your programs before you run them. Node takes care of that for you by compiling your JavaScript to machine code before it executes it, all in one step.

***

## Exercises

Each of the exercises is contained in the `exercises` directory. There are two folders for each exercise:

- **start** : The [boilerplate code](https://en.wikipedia.org/wiki/Boilerplate_code) necessary for the exercises is contained here. This is where you can write code as we progress through the workshop.
- **solution**: This folder contains __one possible solution__ to the problem. The solution in this folder is not necessarily the only possible solution, so keep that in mind.

**You are now ready to begin!**

- [01 - Hello World](/exercises/01-Hello_World/01-Hello_World.md)
- [02 - Basic Addition](/exercises/02-Basic_Addition/02-Basic_Addition.md)
- [03 - Modules](/exercises/03-Modules/03-Modules.md)
- [04 - Synchronous IO](/exercises/04-Synchronous_IO/04-Synchronous_IO.md)
- [05 - Asynchronous IO](/exercises/05-Asynchronous_IO/05-Asynchronous_IO.md)
- [06 - Hello HTTP](/exercises/06-Hello_HTTP/06-Hello_HTTP.md)
- [07 - Hello HTTP with Express](/exercises/07-Hello_HTTP_with_Express/07-Hello_HTTP_with_Express.md)
- [08 - Routing](/exercises/08-Routing/08-Routing.md)
- [09 - Routing with Router](/exercises/09-Routing_with_Router/09-Routing_with_Router.md)
- [10 - Static files](/exercises/10-Static_files/10-Static_files.md)
- [11 - Middleware](/exercises/11-Middleware/11-Middleware.md)
- [12 - Consuming APIs](/exercises/12-Consuming_APIs/12-Consuming_APIs.md)

***

## Weather App
- Read cities from a file
- GET weather data for those cities
- return data to be displayed on the client
- if we add cities, write them to file
- if we delete cities, rewrite the list to file.
- CRUD API design

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
