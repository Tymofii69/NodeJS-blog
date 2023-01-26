const express = require('express');

const app = express()

const ejs = require('ejs')

// register view engine
app.set('view engine', 'ejs') //as default value, ejs and express uses 'views' folder
app.set('views', 'public')    //that's why here we set the default folder to 'public' folder

// listen for requests
app.listen(3000);

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