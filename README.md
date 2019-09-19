# Building RESTful APIs with Express
- REST defines a set of conventions for creating HTTP services:
- POST: to create a resource
- PUT: to update it
- GET: to read it
- DELETE: to delete it
- Express is a simple, minimalistic and lightweight framework for building web
servers.

## Additional
 
- We use Nodemon to watch for changes in files and automatically restart the
node process.
- We can use environment variables to store various settings for an application. To
read an environment variable, we use process.env.
```
// Reading the port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port);
```
- Always validate! Use Joi package to perform input validation. 

## Express: Advanced 

- A middleware function is a function that takes a request object and either
terminates the request/response cycle or passes control to another middleware
function.
- Express has a few built-in middleware functions:
- json(): to parse the body of requests with a JSON payload
- urlencoded(): to parse the body of requests with URL-encoded payload
- static(): to serve static files
- You can create custom middleware for cross-cutting concerns, such as logging,
authentication, etc. 
```
// Custom middleware (applied on all routes)
app.use(function(req, res, next)) {
 // …
 next();
}
// Custom middleware (applied on routes starting with /api/admin)
app.use(‘/api/admin’, function(req, res, next)) {
 // …
 next();
}
```
- We can detect the environment in which our Node application is running
(development, production, etc) using process.env.NODE_ENV and
app.get(‘env’). 
- The config package gives us an elegant way to store configuration settings for
our applications.
- We can use the debug package to add debugging information to an application.
Prefer this approach to console.log() statements.
- To return HTML markup to the client, use a templating engine. There are various
templating engines available out there. Pug, EJS and Mustache are the most
popular ones. 
