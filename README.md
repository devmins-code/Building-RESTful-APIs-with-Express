# Building RESTful APIs with Express
So, in this section, you learned that:
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
