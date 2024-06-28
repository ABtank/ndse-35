require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')

const AuthController = require('./controllers/authController');

const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const apiBookRouter = require('./routes/api/book')
const bookRouter = require('./routes/book')
const errorRouter = require('./routes/error')


//-= PASSPORT =-
// подсказка passport под какими полями передаем параметры
const options = {
    usernameField: "email",
    passwordField: "password"
}
passport.use('local', new LocalStrategy(options, AuthController.verify));
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);
// -= END PASSPORT =-



const app = express();

// для получения req.body иначе undefined
app.use(express.json())

// Для EJS
app.set("view engine", "ejs")
app.use(express.urlencoded())

app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize())
app.use(passport.session())

// логирование подключили
app.use(logger)

// отдаем статику (__dirname - корень проекта)
app.use('/public', express.static(__dirname + '/public'))

app.use(AuthController.setAuthUser)
// начальная страница
app.use('/', indexRouter)
app.use('/auth', authRouter)

app.post('/auth/login',
    passport.authenticate('local', { failureRedirect: '/auth/login' }),
    (req, res) => {
        res.redirect('/')
    })

app.use(AuthController.checkAuth)

// UI по пользователям url = /user + url из роута
app.use('/user', userRouter)

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