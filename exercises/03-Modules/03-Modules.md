[To previous lesson](/exercises/02-Basic_Addition/02-Basic_Addition.md)

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

[To next lesson](/exercises/04-Synchronous_IO/04-Synchronous_IO.md)
