const express = require('express')

const logger = require('./middleware/logger')
const errorMiddlevare = require('./middleware/error')
const indexRouter = require('./routes/index')
const todoRouter = require('./routes/todo')



const app = express();

// для получения req.body иначе undefined
app.use(express.urlencoded({
    extended: true
}))

app.set("view engine", "ejs")

app.use(logger)
app.use('/public', express.static(__dirname + '/public'))

// начальная страница
app.use('/', indexRouter)
app.use('/todo', todoRouter)

// обработка ошибки 404 после определения всех роутов
app.use(errorMiddlevare)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});