const fs = require('fs')
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .option('file', {
        alias: "f",
        type: "string",
        description: "имя файла для вывода результатов"
    })
    .argv;

let fileName;

if (argv.f) {
    fileName = argv.f
    readFile(`${fileName}.json`)
} else {
    console.log(`укажите имя файла для вывода результатов`);
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('line', (input) => {
        fileName = input;
        readFile(`${fileName}.json`)
        return rl.close();
    });
}

function readFile(filePath) {
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('Файл не найден')
        } else {
            const readStream = fs.createReadStream(filePath);
            readStream
                .setEncoding('utf-8')
                .on('data', (chank) => {
                    if (chank) {
                        const data = JSON.parse(chank);
                        const count_try = data.count_try
                        const win = data.win
                        const loose = data.loose
                        console.log(`Всего попыток: ${count_try}\nВыйграл: ${win}\nПроиграл: ${loose}\nПроцент выйгрыша: ${(count_try > 0) ? ((win / count_try) * 100).toFixed(2) : 0}`)
                    }
                })
        }
    })
}