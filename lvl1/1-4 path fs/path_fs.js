const path = require('path')
const fs = require('fs')

console.log(path.parse(__filename))

console.log(path.join(__filename, 'test', '..', '//demo.txt'))
console.log(path.join(__filename, 'test', '//demo.txt'))


// создать новую директорию
const dir = path.join(__dirname, 'demo');
fs.rmdir(dir, (err) => {
    if (err) console.log(err)
    console.log('ok rmdir dir')
})
fs.mkdir(dir, (err) => {
    if (err) throw Error(err)
    console.log('ok dir')
})


// создать новый файл
const file = path.join(__dirname, "new.txt");
const content = 'content \n';

// проверка на наличие файла
fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
        // создать новый файл
        fs.writeFile(file, content, (err) => {
            if (err) throw Error(err)
            console.log('ok file')
        })
    } else {
        // дозапишем содержимое в файл
        fs.appendFile(file, content, (err) => {
            if (err) throw Error(err)
            console.log('ok appendFile')
        })

        // чтение из файла
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) throw Error(err)
            console.log('ok readFile')
            console.log(data)
        })
    }
});

