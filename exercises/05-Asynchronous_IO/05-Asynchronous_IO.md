[To previous lesson](/exercises/04-Synchronous_IO/04-Synchronous_IO.md)

# 05 - Asynchronous I/O

> **Learning goal:** Understand how Node.js deals with file I/O (continued)

Now that we've performed blocking I/O, let's move onto non-blocking I/O so we can read files like Node intends. Like the last example, we'll be creating a CLI to read the number of occurences of a specified colour in a JSON file.

Again, we'll need to use Node's filesystem API:

```js
const fs = require('fs');
```

We'll also need the same command line arguments:

```js
const filename = process.argv[2];
const colourToCount = process.argv[3];
```

We also want to perform the same check to ensure that we have received valid inputs to our CLI:

```js
if(filename !== '' || colourToFind !== '') {
	// count colours
} else {
	throw new Error('You must supply a filename and a colour to count!')
}
```

Inside our `if` statement, we want to create the same `count` variable and the same Regular Expression to match the colours:

```js
let count = 0;
const regexp = new RegExp(colourToCount, 'i');
```

This is where things change. Instead of using `fs.readFileSync`, we want to use `fs.readFile` so that we perform an asychronous file read. Your first reaction might be to try something like this:

```js
const colours = JSON.parse(fs.readFile(filename));
```

but asynchronous operations don't work like that. `fs.readFile` doesn't return the data read from file. To access that, we need to use what is called a **calback function**. A callback function is a function that is executed after an asynchronous operation has been performed. So instead of only passing a `filename` to `fs.readFile`, we also want to pass our callback function. In this case, our callback function takes two inputs, `error` , which is any error that occurs when reading the file, and `colour`, which will be the data contained in the file. 

```js
fs.readFile(filename, (error, colours) => {
	// do something with the colours!
});
```

Let's tell the callback function what to do. If we get an error, we want to throw an error saying that we can't read from the specified file:

```js
fs.readFile(filename, (error, colours) => {
	if(error) {
		throw new Error(`Cannot read colours from ${filename}`);
	}
});
```

Like the last exercise, we want to parse the data read from the file into JSON, count the number of colour matches, then print a message based on the result:

```js
fs.readFile(filename, (error, colours) => {
	if(error) {
		throw new Error(`Cannot read colours from ${filename}`);
	}

	colours = JSON.parse(colours);

	colours.forEach(colour => {
		if(colour.match(regexp)) {
			count++;
		}
	});

	if(count <= 0) {
		console.log(`Unable to find "${colourToCount}" in ${filename}`);
	} else {
		console.log(`There are ${count} occurences of ${colourToCount} in ${filename}`);
	}
});
```

We've completed all of the counting code, but what happens if we run the program and we leave the `console.log` statement at the end of the `if` statement? There is a very good chance (if not a certainty), that we will see "Exiting" on the terminal before we see a colour count. This is due to the way Node.js utilizes the event loop. Like we talked about earlier, Node.js unloads IO operations to the host computer's OS. This allows Node to continue executing the rest of the code in the file. In our case, when the information from the file is recieved, the callback function is executed, but while waiting for the file to be read, "Exiting" is printed to the console. This is very important to remember when creating Node programs. If you are performing some operation that will use the result of an asynchronous operation, then you have to place your code in the correct location.

[To next lesson](/exercises/06-Hello_HTTP/06-Hello_HTTP.md)
