import 'reflect-metadata';
import { container, TYPES } from './infrastructure/container';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Express} from 'express';
// -= PASSPORT =-
import * as session from 'express-session';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {UserModel} from './models/user';
import { AuthController } from './controllers/authController';
const authController: AuthController = container.get(TYPES.AuthController);
 
// Инициализация dotenv для загрузки переменных окружения
dotenv.config();

// websocket
import * as http from 'http';
import { Server as SocketIO } from 'socket.io';

//-= ROUTERS =-
import logger from './middleware/logger';
import {error404} from './middleware/err-404';
import indexRouter from './routes/index';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import apiBookRouter from './routes/api/book';
import bookRouter from './routes/book';
import errorRouter from './routes/error';

import "./infrastructure/db_connection"
import "./infrastructure/container"


//-= PASSPORT =-
// подсказка passport под какими полями передаем параметры
const options = {
    usernameField: "email",
    passwordField: "password"
}

// Функция сериализации пользователя
passport.serializeUser((user: any, done: Function) => {
    done(null, user._id); // Make sure user here has _id.
});

// Функция десериализации пользователя
passport.deserializeUser(async (id: string, done: Function) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

passport.use('local', new LocalStrategy(options, authController.verify));
// -= END PASSPORT =-



const app: Express = express();


// Определим входящее соединение websocket
const server = http.createServer(app);
const io = new SocketIO(server);
import {SocketHandler} from "./controllers/socketHandler"
const socketHandler = container.get(SocketHandler);
socketHandler.connection(io);

// для получения req.body иначе undefined
app.use(express.json())

// Для EJS
app.set("view engine", "ejs")
app.use(express.urlencoded())

app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// логирование подключили
app.use(logger)

// отдаем статику (__dirname - корень проекта)
app.use('/public', express.static(__dirname + '/public'))

app.use(authController.setAuthUser)
// начальная страница
app.use('/', indexRouter)

//-= PASSPORT =-
app.use('/auth', authRouter)
app.post('/auth/login',
    passport.authenticate('local', { failureRedirect: '/auth/login' }),
    (req, res) => {
        res.redirect('/')
    })
app.use(authController.checkAuth)

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

async function start(PORT:number| string) {
    try {
        console.log("APP TRY START!", PORT)
        // await mongoose.connect(UrlDB);
        server.listen(PORT);
        console.log("APP START!", PORT)
    } catch (e) {
        console.log(e)
    }
}

// const UrlDB = process.env.UrlDB || '';
const PORT = process.env.PORT || 3000;
start(PORT);