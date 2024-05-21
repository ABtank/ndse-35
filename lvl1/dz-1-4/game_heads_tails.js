const fs = require('fs')

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const minNumber = 1;
const maxNumber = 100;
let fileName;
let readStream;
let writeStream;
let data;
let win = 0;
let loose = 0;
let count_try = 0;

console.log(`укажите имя файла для записи результатов`);

rl.on('line', (input) => {
    const inp = input;
    if (inp === 'no' || inp === 'n') {
        console.log(`Всего попыток: ${count_try}\nВыйграл: ${win}\nПроиграл: ${loose}\nПроцент выйгрыша: ${(count_try > 0) ? ((win / count_try) * 100).toFixed(2) : 0}`)
        return rl.close();
    }
    if (!fileName) {
        fileName = input;
        console.log(`Загадано число 1 или 2`);
        fs.access(`${fileName}.json`, fs.constants.F_OK, (err) => {
            if (err) {
                data = { 'count_try': count_try, 'win': win, 'loose': loose }
                writeFile (`${fileName}.json`, JSON.stringify(data))
            } else {
                readFile(`${fileName}.json`)
            }
        })
        return;
    } else {
        readFile(`${fileName}.json`)
    }

    const guessedNumber = (Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber) % 2 + 1;
    const number = parseInt(inp);

    console.log(`Загадано число 1 или 2`);
    if (isNaN(number)) {
        console.log('Пожалуйста, введите число.');
        return;
    }

    if (number === guessedNumber) {
        console.log('угадал');
        win++;
    } else {
        console.log(`проиграл`);
        loose++;
    }
    count_try++;
    data = { 'count_try': count_try, 'win': win, 'loose': loose }

    writeFile (`${fileName}.json`, JSON.stringify(data))
    console.log(`повторим? y/n`);
});


function readFile(filePath){
    readStream = fs.createReadStream(filePath);
        readStream
            .setEncoding('utf-8')
            .on('data', (chank) => {
                if (chank) {
                    data = JSON.parse(chank);
                    count_try = data.count_try
                    win = data.win
                    loose = data.loose
                } else {
                    data = { 'count_try': count_try, 'win': win, 'loose': loose }
                }
            })
            .on('end', () => {
                // console.log('end', data);
            })
            .on('error', () => {
                console.log('readStream error');
            })
}

function writeFile (filePath, data) {
    writeStream = fs.createWriteStream(`${fileName}.json`);
    writeStream.write(data);
    writeStream.end();
}