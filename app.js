const express = require('express');
const morgan = require("morgan")
const mongoose = require("mongoose")
const Blog = require('./models/blog')

const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://qweasdzxc701:QQQIII68@cluster0.ghuryqb.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
mongoose.connect(dbURI)
    .then((result) => app.listen(3000)) // it's begin to listen requests only when the database is loaded
    .catch((err) => console.log(err));

//mongoose and mongodb sandbox routes 
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog',
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get("/all-blogs", (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => console.log(err))
})

app.get("/single-blog", (req, res) => {
    Blog.findById('63d395a5edfb36688458644c')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => console.log(err))
})

// register view engine
app.set('view engine', 'ejs') //as default value, ejs and express uses 'views' folder
app.set('views', 'public')    //that's why here we set the default folder to 'public' folder

// listen for requests


// middleware and static files
app.use(express.static('static_files')); // this string is setting the folder named `static_files` as public, in other words, the files inside are accessible for frontend part of webpage
app.use(morgan('dev')); // that's just to test using the lowest level middleware

// next section

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ]    
    
    //That's an old version with only Express:
    //res.sendFile('/public/index.html', { root: __dirname });

    //That's a updated version, using ejs and Express together:
    res.render('index', { title: "Home", blogs });    // it's looking for the index.ejs in default folder, which we setted as 'public'
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "New Blog" });
})

// 404 page
app.use((req, res) => {     
    //be careful, use `.use` only in the end of request listeners, because it'll be triggered every listening period,
    // so, after triggering this `.use` the next request getters won't be active

    //res.status(404);  //you could use either this way, or the way below
    res.status(404).render('404', { title: "404" })
})