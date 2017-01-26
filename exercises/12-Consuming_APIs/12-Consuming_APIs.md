[To previous lesson](/exercises/11-Middleware/11-Middleware.md)

# 12 - Consuming APIs

> **Learning goal:** Understand how to make HTTP requests from a Node.js server.

Something that you may want to do on your server is make requests to an external API so you can get information to use in you application. In this exercise, we want to make a GitHub profile viewer, so we will use GitHub's API to gather user information to send to the client. 

We will also be using a module called [request](https://github.com/request/request) so make sure to install that along with Express. This module will be used to perform HTTP requests where our server is the client. We will be writing all of our code in `router.js`.

You'll see that we have our import statements at the beginning of the file, as well as the initialization of our `Router` instance. There is also an initial route that has been included. Since we don't use `/` in our application, it is a good idea to put instructions at `/` on how to use our application since this is normally where a user will navigate.

We want to use a URL parameter to recieve a GitHub username, so let's define our new route accordingly:

```js
router.get('/:username', (req, res) => {
    const username = req.params.username;
    // Get GitHub info here
});
```

Next, we want to create a config object for our request. We need to specify the URL of our request. We also need to identify ourself when making requests to the GitHub API using a request header:

```js
const options = {
	url: `https://api.github.com/users/${username}`,
	headers: {
		'User-Agent': 'zackharley'
	}
}
```

Now that we have all of the data needed to make a request, we can do just that. Making a request is easy; we pass the `options` object to `request` along with a callback function that will be executed when the request is completed:

```js
request(options, (error, response, body) => {
    // handle request
});
```

There are two cases that we want to handle once we recieve the result of a request. If the request returns without an error and has a status code of 200, i.e. success, then we want to render the user's GitHub information. If not, then we want to respond with the error.

```js
if(!error && response.statusCode === 200) {
    // Render GitHub profile
} else {
    // Return error
}
```

Let's start with the successful response. First, we have to parse the response to turn it into a JSON object:

```js
body = JSON.parse(body);
```

Next, we want to define a `user` object will contain all of the user information that we want to render. This will contain the URL of the user's avatar (or display picture), the URL of their GitHub account, their name, their bio (if supplied), their location (if supplied), the number of public GitHub repositories that they have, as well as the number of followers they have and the umber of users that they are following:

```js
let user = {
	avatarUrl: body.avatar_url,
	profileUrl: body.html_url,
	name: body.name,
	bio: body.bio,
	location: body.location,
	repos: body.public_repos,
	followers: body.followers,
	following: body.following,
	username
};
```

The full structure of a response from the `https://api.github.com/users/:username` can be seen in the documentation for the GitHub API.

Now that we have the user's information, we want to dynamically generate the HTML used to display this information. We use the file `/views/home.js` for this. This module exports a function which receives the user information that we want to render, inserts it into a predefined HTML page, and returns the HTML as a string:

```js
res.send(home(user));
```

> **NOTE:** `/views/home.js` is a very basic example of a template engine (a library that allows you to dynamically generate HTML on-the-fly). Using a template engine is beyond the scope of this workshop, but some popular template engines for you to explore include [Pug](https://pugjs.org/api/getting-started.html), [Handlebars](http://handlebarsjs.com/), and [Mustache](https://github.com/janl/mustache.js). 

The case when an error occurs is much easier. We want to update the status code of our response to match that which we received from the GitHub API. We also want to send an error, if there is an error, or else send the body of the response from the GitHub API:

```js
    res.status(response.statusCode).send(error || body);
```

This is all of the code we need to display a user's GitHub information. Now, go try it!

[To project]()
