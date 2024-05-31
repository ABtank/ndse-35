const fs = require('fs')
const os = require('os')


module.exports = (req,res, next) => {
    const now = new Date()
    const {url, method} = req

    const data = `${now.toISOString()} ${method} ${url}`

    // os.EOL перенос строки
    fs.appendFile("server.log", data + os.EOL, (err) => {
        if (err) throw err;
    })


    // вызвыаем next() чтоб передать управление остальным функциям
    next()
}