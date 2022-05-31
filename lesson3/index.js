const fs = require('fs');
const readline = require("readline");

const access_log = './access.log';
const ipToFind = ['89.123.1.41', '34.48.240.111']
const path = '_requests.log';

const readLine = readline.createInterface({
    input: fs.createReadStream(access_log, 'utf8'),
});

function writeStream(ip) {
    return fs.createWriteStream(`./${ip}${path}`, {
        encoding: 'utf-8',
        flags: 'a',
    });
}

const writeStream1 = writeStream(ipToFind[0]);
const writeStream2 = writeStream(ipToFind[1]);

readLine.on("line", function (input) {
    if (input.includes(ipToFind[0])) writeStream1.write(input + '\n');
    if (input.includes(ipToFind[1])) writeStream2.write(input + '\n');
});
readLine.on("end", () => readLine.close());