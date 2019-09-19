const startupdebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')  // debuging code using console

const config = require('config')
const Joi = require('joi')
const express = require('express')
const app = express();
const _ = require('underscore')
const helmet = require('helmet')
const morgan = require('morgan')

const logger = require('./middleware/logger');
const authentication = require('./middleware/auth');

// configration below -----------
console.log("Application Name -- " + config.get('name'))
console.log("Mail Host -- " + config.get('mail.host'))
console.log("Mail Host Password -- " + config.get('mail.password'))
// do not save passwords/secrets in config file but you can save it in environment variable
// run : SET app_password=1234 i.e app_name and the variable name and map the vcriable in custom-environment-variable file
// configration  -----------

// view ----------------
app.set('view engine','pug')
// express will internally load this module
app.set('views','./views')
// we can set path to the view teampletaes where to be store default is given one and this is optional
// view ----------------

// built in middleware function ------------
// below enable the parsing of the json obj this will populate req.body property
app.use(express.json());
// below is use to serve static files and public the name fo the folder where we put our files/assets like css, js etc
app.use(express.static('public')) // you can directly acces public file by http://localhost:3000/readme.txt
// built in middleware function --------------

// custom middleware function call -------------
app.use(logger.log)
app.use(authentication.auth)
// custom middleware function call --------------

// third-party middleware function ---------------
app.use(helmet())
// below is used to log http request : every time we make a request it will log if you want more details change tiny
// app.use(morgan('tiny'))
// we will log req only in development machine and to set environment : SET NODE_ENV=production (on windows)
console.log(app.get('env'))
if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    // console.log('morgan enabled...')
    startupdebugger('morgan enabled...')
    // we have set environment variable to set what kind of debug inforation we want to see on console i.e : SET DEBUG=app:startup
    // to deset : SET DEBUG=
    // or we want to see all debuger log use SET DEBUG=app*
}
dbDebugger('Connection to the database') // debuger
// third-party middleware function ---------------

const courses =  [
    {
        id : 1,
        name : 'Machine learning'
    },
    {
        id : 2,
        name : 'Deep learning '
    },
    {
        id : 3,

        name : 'Nodejs'
    }

]

app.get('/',(req,res)=>{
    res.render('index',{title:"My Express App" , message:"Hello World!"})
})

// Getting all the courses
app.get('/api/courses',(req,res)=>{
    console.log(req.query)
    if(("sortBy" in req.query)){
        let sortedObjs = _.sortBy( courses, req.query.sortBy);
        return  res.send(sortedObjs)
    }else{
        return res.send(courses)
    }

})

// Getting a single course
app.get('/api/courses/:id', (req, res) => {
    const courseId = req.params.id;
    // Lookup the course
    let course = courses.find(c=> c.id === parseInt(courseId));
    if (!course)
        res.status(404).send('course not found')
    else
        res.send(course)
});

// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // If course not found, return 404, otherwise delete it
    const courseId = req.params.id;
    // Lookup the course
    let course = courses.find(c=> c.id === parseInt(courseId));
    if (!course)  return res.status(404).send('course not found')

    const index = courses.indexOf(course)
    courses.splice(index,1)
    return res.send(course)


});

// Updating a course
app.put('/api/courses/:id', (req, res) => {
    // If course not found, return 404, otherwise update it
    const courseId = req.params.id;
    // Lookup the course
    let course = courses.find(c=> c.id === parseInt(courseId));
    if (!course)  return res.status(404).send('course not found')
    // and return the updated object.
    // const result = validateCourse(req.body)
    const {error} = validateCourse(req.body)
    if(error) return res.status(400).send(error)

    course.name = req.body.name

    res.send(course)
});

// Creating a course
app.post('/api/courses', (req, res) => {
    // Create the course and return the course object
    const {error} = validateCourse(req.body)
    if(error) return res.status(400).send(error)

    const course ={
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course);
    res.status(200).send(course)
});

function validateCourse(course) {
    const schema = {
        name : Joi.string().min(3).required()
    }
    return  Joi.validate(course,schema)
}


// PORT
const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`listining on post ${port}..`))

