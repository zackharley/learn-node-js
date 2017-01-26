[To previous lesson](/exercises/05-Asynchronous_IO/05-Asynchronous_IO.md)

# 06 - Hello HTTP

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

[To next lesson](/exercises/07-Hello_HTTP_with_Express/07-Hello_HTTP_with_Express.md)
