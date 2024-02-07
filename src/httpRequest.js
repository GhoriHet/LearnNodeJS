const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const urlPath = url.parse(req.url, true).pathname;

    const pathName = path.join(__dirname, 'assets', 'file', 'data.json')

    if (req.method === 'GET' & urlPath === '/api/v1/users') {
        try {
            fs.readFile(pathName, "utf-8", (error, data) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Intenal server error!!" }));
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                const responseData = {
                    success: true,
                    data,
                    message: "Data fetched successfully!!"
                }
                res.end(JSON.stringify(responseData));
            })
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Intenal server error!!" }));
        }
    } else if (req.method === 'POST') {

    } else if (req.method === 'PUT') {

    } else if (req.method === 'DELETE') {

    }
})

server.listen(3000, () => {
    console.log("Server started on port 3000");
})