const express = require('express');
const morgan = require("morgan")
const mongoose = require("mongoose")
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')
import dbURI from './mongodb.js'

const app = express()

// connect to mongodb
mongoose.set('strictQuery', true);
mongoose.connect(dbURI)
    .then((result) => app.listen(3000)) // it's begin to listen requests only when the database is loaded
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs') //as default value, ejs and express uses 'views' folder
app.set('views', 'public')    //that's why here we set the default folder to 'public' folder


// middleware and static files
app.use(express.static('static_files')); // this string is setting the folder named `static_files` as public, in other words, the files inside are accessible for frontend part of webpage
app.use(express.urlencoded({ extended: true })) // it takes the data from `create new blog` page, and passes it into object, that we can use in our `app.post` request object named `app.body`
app.use(morgan('dev')); // that's just to test using the lowest level middleware

// routes

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})

// blog routes
//app.use(blogRoutes) // it's just using all bunch of code from `blogRoutes.js` file. In this app, this Router is not too useful, but you can imagine, that for bigger projects it'll make sense to have a root file e.g. `app.js`, and multiple files with routes for `/blogs` or `/shops` to simplify the structure
app.use('/blogs/', blogRoutes); //it's doing the same thing, as previous string, but it runs only if we are on the path `/blogs`. Also, for that reason, in file `blogRoutes.js` in `.get` handlers, we need to replace the `/blogs` path to `/` and accordingly edit the other links there

// 404 page
app.use((req, res) => {     
    //be careful, use `.use` only in the end of request listeners, because it'll be triggered every listening period,
    // so, after triggering this `.use` the next request getters won't be active

    //res.status(404);  //you could use either this way, or the way below
    res.status(404).render('404', { title: "404" })
})