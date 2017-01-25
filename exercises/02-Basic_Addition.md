[To previous lesson](/exercises/02-Basic_Addition.md)

# 02 - Basic Addition

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

[To next lesson](/exercises/03-Modules.md)
