const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
     // console.log(req.method);
    // console.log(req.headers);
    // console.log(req.url);
    // console.log(url.parse(req.url,true));

    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.end('<H1>Localhost:3000</H1>')
    if (req.method === 'GET') {
        fs.readFile('./src/assets/file/data.json', "utf-8", (err, data) => {
            if (err) {
                console.log(err.message);
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data);
        })
    }
})

server.listen(3000, () => {
    console.log("Server started on port 3000");
})