#!C:\Program Files\nodejs\node.exe

const yargs = require('yargs');
const {
    lstatSync
} = require('fs');
const inquirer = require('inquirer');
const fs = require('fs/promises');
const path = require('path');

const conditions = yargs
    .usage("Usage: -p <path>")
    .option("p", {
        alias: "path",
        describe: "Path to file",
        type: "string",
        default: process.cwd(),
        demandOption: false
    })
    .option("s", {
        alias: "search",
        describe: "Search matching in file",
        type: "string",
        default: '',
        demandOption: false
    })
    .argv;

let dir = process.cwd();

class Path {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }

    get checkFile() {
        return lstatSync(this.path).isFile();
    }
}

const run = async (myPath = dir) => {
    const list = await fs.readdir(myPath);
    const items = list.map(fileName =>
        new Path(path.join(myPath, fileName), fileName));

    const item = await inquirer
        .prompt([{
            name: 'fileName',
            type: 'list',
            message: `Выберите папку/файл`,
            choices: items.map(item => ({
                name: item.fileName,
                value: item
            })),
        }])
        .then(answer => answer.fileName);

    if (item.checkFile) {
        const data = await fs.readFile(item.path, 'utf-8');
        if (conditions.s) {
            const regExp = new RegExp(conditions.s, 'g');
            console.log(data.match(regExp));
        } else {
            console.log(data);
        }
    } else {
        dir = item.path;
        return await run();
    }
}

run(conditions.p);