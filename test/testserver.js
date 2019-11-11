const path = require('path');
const http = require('http');
const WeasyPrint = require('..');

const wp = new WeasyPrint();

const server = http.createServer(async (req, res) => {
    try {
        const pdf = await wp.fromFile('./test.html');
        const str = await pdf.toStream();
        res.setHeader('content-type', 'application/pdf');
        str.pipe(res);
    } catch (err) {
        res.setHeader('content-type', 'text/plain');
        res.end(err.stderr || err.stack);
    }
});

const port = process.env.PORT || 80;
server.listen(port);
console.log(`Listening on ${port}`);
