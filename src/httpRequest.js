const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

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
    } else if (req.method === 'POST' && urlPath === '/api/v1/users') {
        try {
            fs.readFile(pathName, "utf-8", (error, data) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Internal server error!!" }));
                } else {
                    let postData = '';
                    let fileData = JSON.parse(data);

                    req.on('data', chunk => {
                        postData += chunk;
                    });

                    req.on('end', () => {
                        let newData = '';
                        try {
                            newData = JSON.parse(postData);
                        }
                        catch (error) {
                            res.writeHead(500, { 'Content-Type': 'application/json' })
                            res.end(JSON.stringify({ message: 'error' }))
                        }
                        fileData.push(newData);

                        fs.writeFile(pathName, JSON.stringify(fileData), (error) => {
                            if (error) {
                                res.writeHead(500, { 'Content-Type': 'application/json' })
                                res.end(JSON.stringify({ message: 'Internal server error!!' }))
                            } else {
                                res.writeHead(200, { 'Content-Type': 'application/json' })
                                res.end(JSON.stringify({ message: 'Data post successfully!' }))
                            }
                        })
                    });
                }
            });
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'error' }))
        }
    } else if (req.method === 'PUT' && urlPath === '/api/v1/users') {
        let bodyData = '';
        let id = url.parse(req.url, true).query.id;

        req.on("data", chunk => {
            bodyData += chunk;
        })

        fs.readFile(pathName, "utf-8", (error, data) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Intenal server error!!" }));
            }
            oldData = JSON.parse(data);
            let userData = JSON.parse(bodyData);

            let index = oldData.findIndex((value) => value.id == id);
            oldData[index] = userData;

            fs.writeFile(pathName, JSON.stringify(oldData), (error) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: 'Internal server error!!' }))
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: 'Data put successfully!' }))
                }
            })
        })

    } else if (req.method === 'DELETE') {
        let id = url.parse(req.url, true).query.id;

        fs.readFile(pathName, "utf-8", (error, data) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Intenal server error!!" }));
            }
            oldData = JSON.parse(data);

            let nData = oldData.filter((value) => value.id != id);

            fs.writeFile(pathName, JSON.stringify(nData), (error) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: 'Internal server error!!' }))
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: 'Data delete successfully!' }))
                }
            })
        })
    }
})

server.listen(3000, () => {
    console.log("Server started on port 3000");
})
