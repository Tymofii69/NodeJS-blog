const express = require('express');
const morgan = require("morgan")
const mongoose = require("mongoose")
const Blog = require('./models/blog');
const { render } = require('ejs');

const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://qweasdzxc701:QQQIII68@cluster0.ghuryqb.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
mongoose.connect(dbURI)
    .then((result) => app.listen(3000)) // it's begin to listen requests only when the database is loaded
    .catch((err) => console.log(err));

//mongoose and mongodb sandbox routes 
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog',
//     });

//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// app.get("/all-blogs", (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => console.log(err))
// })

// app.get("/single-blog", (req, res) => {
//     Blog.findById('63d395a5edfb36688458644c')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => console.log(err))
// })

// register view engine
app.set('view engine', 'ejs') //as default value, ejs and express uses 'views' folder
app.set('views', 'public')    //that's why here we set the default folder to 'public' folder


// middleware and static files
app.use(express.static('static_files')); // this string is setting the folder named `static_files` as public, in other words, the files inside are accessible for frontend part of webpage
app.use(express.urlencoded({ extended: true })) // it takes the data from `create new blog` page, and passes it into object, that we can use in our `app.post` request object named `app.body`
app.use(morgan('dev')); // that's just to test using the lowest level middleware

// next section

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})

// blog routes

app.get("/blogs", (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err)
    })
})

app.post('/blogs', (req, res) => {
    //console.log(req.body)  // req.body is the request object, which takes data from `create.ejs`, using middleware `express.urlencoded`
    const blog = new Blog(req.body);

    blog.save()  // it saves the data from `req.body` to the database
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "New Blog" });
})

app.get('/blogs/:id', (req, res) => {   //it's neccessary to type the `/:id` with colon, otherwise, it'd be looking for the exact page with path `/blogs/id`
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch(err => console.log(err))
})   

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })   //interesting, that we can't make res.redirect here, because we've used a JS frontend code to make a request
        })
        .catch(err => console.log(err))
})

// 404 page
app.use((req, res) => {     
    //be careful, use `.use` only in the end of request listeners, because it'll be triggered every listening period,
    // so, after triggering this `.use` the next request getters won't be active

    //res.status(404);  //you could use either this way, or the way below
    res.status(404).render('404', { title: "404" })
})