import http from 'http';
import fs, {
    createReadStream
} from 'fs';
import path from 'path';

const __dirname = path.resolve();
const filesList = (directory) => fs.readdirSync(directory);
const isDir = (element) => fs.lstatSync(element).isDir();
const getPath = (path, element) => {
    if (path !== '/') {
        return `http://localhost:3000${path}/${element}`
    } else {
        return `http://localhost:3000/${element}`
    }
};


const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url !== '/favicon.ico') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8;'
        });

        if (isDir(`${__dirname}${req.url}`)) {
            res.write('<h1>Выберите фай или папку</h1>');

            filesList(`${__dirname}${req.url}`).forEach(element => {
                res.write(`<a href = '${getPath(req.url, element)}'>${element}</a><br>`);
                console.log(req.url, element, __dirname);
            });
            res.end();
        } else {
            const readStream = createReadStream(`${__dirname}${req.url}`, {
                encoding: 'utf-8',
                highWaterMark: 64
            });

            readStream.pipe(res);
        }
    } else {
        res.end();
    }
});

server.listen(3000, 'localhost');