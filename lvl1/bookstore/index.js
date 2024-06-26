require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')

const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const indexRouter = require('./routes/index')
const apiUserRouter = require('./routes/api/user')
const apiBookRouter = require('./routes/api/book')
const bookRouter = require('./routes/book')
const errorRouter = require('./routes/error')


const app = express();

// для получения req.body иначе undefined
app.use(express.json())

// Для EJS
app.use(express.urlencoded({
    extended: true
}))
app.set("view engine", "ejs")

// логирование подключили
app.use(logger)

// отдаем статику (__dirname - корень проекта)
app.use('/public', express.static(__dirname + '/public'))

// начальная страница
app.use('/', indexRouter)

// api по пользователям url = /users + url из роута
app.use('/api/users', apiUserRouter)

// api по книгам url = /book + url из роута
app.use('/api/books', apiBookRouter)

// api по книгам url = /book + url из роута
app.use('/books', bookRouter)

// обработка UI ошибкок
app.use('/error', errorRouter)

// обработка ошибки 404 после определения всех роутов
app.use(error404)

async function start(PORT, UrlDB) {
    try {
        console.log("APP TRY START!", PORT, UrlDB)
        await mongoose.connect(UrlDB);
        app.listen(PORT);
        console.log("APP START!", PORT, UrlDB)
    } catch (e) {
        console.log(e)
    }
}
 
const UrlDB = process.env.UrlDB;
const PORT = process.env.PORT || 3000;
start(PORT, UrlDB);