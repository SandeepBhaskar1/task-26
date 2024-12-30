const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 1163;
const hostname = process.env.HOSTNAME || 'localhost';

const home = fs.readFileSync("index.html", "utf-8");
const about = fs.readFileSync("about.html", "utf-8");
const contact = fs.readFileSync("contact.html", "utf-8");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(home);
    } else if (req.url === "/about") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(about);
    } else if (req.url === "/contact") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(contact);
    } else if (req.url === "/washing-machine.png") {
        const imagePath = path.join(__dirname, "washing-machine.png");
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain");
                res.end("Error loading image");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "image/png");
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>404 - Page Not Found</h1>");
    }
});

server.listen(PORT, hostname, () => {
    console.log(`Server is working on http://${hostname}:${PORT}`);
});
