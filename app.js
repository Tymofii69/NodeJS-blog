const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log("request made")

    // set header content type
    res.setHeader('content-type', 'text/html');  // `text/plain` - usual text, `text/html` - html code

    let path = './public/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html'
            res.statusCode = 404;
    }

    // read an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data);
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log("listening")
})