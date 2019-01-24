const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const response_html = `
        <div style="color:red">
                Hello World!
        </div>
`;

const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(response_html);
});

server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
});
