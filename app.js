const express = require('express');

const app = express()

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    //res.send('<p>home page</p>')
    res.sendFile('/public/index.html', { root: __dirname });
})

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>')
    res.sendFile('/public/about.html', { root: __dirname });
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