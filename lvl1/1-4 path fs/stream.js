const fs = require('fs')

const readerStream = fs.createReadStream('package.json');

let data;
readerStream
    .setEncoding('utf-8')
    .on('data', (chank) => {
        data += chank;
    })
    .on('end', () => {
        console.log('end', data);
    })

const content = 'content \n'
const writerStr = fs.createWriteStream('output.txt')
writerStr.write(content,'UTF-8')
writerStr.end()

// подпись на события
writerStr.on('finish', () => {
    console.log('finish');
})
.on('close', () => {
    console.log('close');
})
.on('error', () => {
    console.log('error');
})

// передача данных из одного потока в другой
const readStr1 = fs.createReadStream('package.json')
const writeStr2 = fs.createWriteStream('output.txt')
// запись данных из одного файла в другой
readStr1.pipe(writeStr2);
