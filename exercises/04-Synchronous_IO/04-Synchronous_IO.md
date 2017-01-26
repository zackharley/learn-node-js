[To previous lesson](/exercises/03-Modules/03-Modules.md)

# 04 - Synchronous I/O

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

[To next lesson](/exercises/05-Asynchronous_IO/05-Asynchronous_IO.md)
