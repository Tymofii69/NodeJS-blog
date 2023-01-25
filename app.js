const http = require('http');

const server = http.createServer((req, res) => {
    console.log("request made")

    // set response
    res.setHeader('content-type', 'text/plain');

    res.write('hello, cats');
    res.end()
});

server.listen(3000, 'localhost', () => {
    console.log("listening")
})