const express = require('express');
const Blog = require('../models/blog');
const router = express.Router(); //it creates a new instance of Router object, which will control the requests around '/blogs' path. Basically, it's like a mini version of `app` variable, which we used in app.js file, and now, as we want to make separate files, that's just not to create another `app` variable (maybe we can't create the second instance of `app`)

router.get("/", (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/', (req, res) => {
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

router.get('/create', (req, res) => {
    res.render('create', { title: "New Blog" });
})

router.get('/:id', (req, res) => {   //it's neccessary to type the `/:id` with colon, otherwise, it'd be looking for the exact page with path `/blogs/id`
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch(err => console.log(err))
})   

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/' })   //interesting, that we can't make res.redirect here, because we've used a JS frontend code to make a request
        })
        .catch(err => console.log(err))
})

module.exports = router;