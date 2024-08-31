import * as bcrypt from 'bcryptjs';
import { UserModel } from '../models/user';

export class AuthController {

    signup = async (req: any, res: any) => {
        try {
            const { email, password } = req.body;

            // Проверяем уникальность
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'такое мыло уже зарегистрировано' });
            }

            // Создаем нового пользака
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                email,
                password: hashedPassword
            });
            await newUser.save();

            res.redirect('/auth/login')
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    logout = (req: any, res: any, next: any) => {
        req.logout((err: any) => {
            if (err) return next(err);
            else res.redirect("/");
        });
    }

    loginPage = (req: any, res: any) => {
        res.render('auth/login',
            {
                title: "Login",
                current_nav: ''
            }
        )
    }

    signupPage = (req: any, res: any) => {
        res.render('auth/signup', {
            user: {},
            title: 'Регистрация',
        })
    };

    checkAuth = (req: any, res: any, next: any) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/login')
        }
        next()
    }

    setAuthUser = (req: any, res: any, next: any) => {
        if (req.isAuthenticated()) {
            res.locals.user = req.user;
        }
        next()
    }

    verify = async (email: string, password: string, done: Function) => {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'User не найден' });
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return done(null, false, { message: 'пароль неверный' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }

}
