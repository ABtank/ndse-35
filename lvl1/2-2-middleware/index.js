const express = require('express')

const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const indexRouter = require('./routes/index')
const demoRouter = require('./routes/demo')


const app = express();

// логирование подключили
app.use(logger)

// отдаем статику (__dirname - корень проекта)
app.use('/public', express.static(__dirname + '/public'))

// укажем роуты которые будем логировать
app.use('/', indexRouter)

// запись файлов url = /demo + url из роута
app.use('/demo', demoRouter)

// обработка ошибки 404 после определения всех роутов
app.use(error404)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});