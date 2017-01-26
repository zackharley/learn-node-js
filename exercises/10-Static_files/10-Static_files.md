[To previous lesson](/exercises/09-Routing_with_Router/09-Routing_with_Router.md)

# 10 - Static Files

> **Learning goal:** Understand how to serve static files to a client easily.

At this point, you might be thinking to yourself "While sending text and JSON objects to a client is cool and all, I really want to learn how to create a server that will host a website or web app!". If that's true, then this is what you've been waiting for!

If you wanted to send a file as a response to a request, you could use the `res.sendFile` function to specify what file to send to the user. Well, what would happen if you had 1000 files that you wanted to be able to return to users when they sent requests to the corresponding 1000 routes? You could create 1000 individual routes for the files, but that would take a long time. Luckily, Express has thought of that and allows you to specify a folder whose files can auto-routes in the manner that we want. The line of code that actually specifies this is

```js
app.use(express.static(path));
```

where `path` is the path to the folder that we want to serve. Since we have not specified a path as the first argument to `app.use`, the static files will all be available at `/:path/:to/:file`. For example, if we want to use the folder `public` as our folder for static files and it contains `myPage.html`, if we navigated to `/myPage.html` then we the HTML file would be rendered.

Just like our past exercises, we need to import our dependencies, initialize our Express `app`, declare our port, and begin listening, but we also want to declare the `public` folder as static:

```js
const express = require('express');
const app = express();

const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
	console.log(`Static files available at http://localhost:${port}/`);
});
```

We can now access the files in public as if they belong to the `/` path of the server. Try it out!

> **NOTE:** `public` contains an `index.html` file. By default for static websites, going to `/` is the same as going to `/index.html`. This is why, if you navigate to `/`, you will see the `index.html` file rendered.

If we wanted to, we could create an entire website using HTML, CSS, and JavaScript, and place it into the `public` folder and we would have a fully functional website!

[To next lesson](/exercises/11-Middleware/11-Middleware.md)
