const Joi = require('joi')
const express = require('express')
const app = express();
const _ = require('underscore')

// enable the parsing of the json obj
app.use(express.json());

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

