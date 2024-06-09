const express = require('express')

const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const indexRouter = require('./routes/index')
const apiUserRouter = require('./routes/api/user')
const apiBookRouter = require('./routes/api/book')



const app = express();

// для получения req.body иначе undefined
app.use(express.json())

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

// обработка ошибки 404 после определения всех роутов
app.use(error404)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});