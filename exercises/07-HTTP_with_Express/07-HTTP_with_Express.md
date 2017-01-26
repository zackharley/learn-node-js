[To previous lesson](/exercises/06-Hello_HTTP/06-Hello_HTTP.md)

# 07 - HTTP with Express.js

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

[To next lesson](/exercises/08-Routing/08-Routing.md)
