const express = require('express');

const app = express()

// register view engine
app.set('view engine', 'ejs') //as default value, ejs and express uses 'views' folder
app.set('views', 'public')    //that's why here we set the default folder to 'public' folder

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    //That's an old version with only Express:
    //res.sendFile('/public/index.html', { root: __dirname });


    //That's a updated version, using ejs and Express together:
    res.render('index');    // it's looking for the index.ejs in default folder, which we setted as 'public'
})

app.get('/about', (req, res) => {
            //res.sendFile('/public/about.html', { root: __dirname });
})

//redirects
app.get('/about-us', (req,res) => {
    res.redirect('/about');
})

// 404 page
app.use((req, res) => {     
    //be careful, use `.use` only in the end of request listeners, because it'll be triggered every listening period,
    // so, after triggering this `.use` the next request getters won't be active

    //res.status(404);  //you could use either this way, or the way below
    res.status(404).sendFile('/public/404.html', { root: __dirname});
})