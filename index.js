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

// ROutes ---------
const courses = require('./routes/courses')
const home = require('./routes/home')
// ROutes ---------

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

// route path ----------------
app.use('/api/courses',courses) // we are telling express that for any route /api/courses go inside courses router
app.use('/',home)
// route path ----------------


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


// PORT
const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`listining on post ${port}..`))

