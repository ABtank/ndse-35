const bcrypt = require('bcryptjs');
const User = require('../models/user');

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Проверяем уникальность
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'такое мыло уже зарегистрировано' });
        }

        // Создаем нового пользака
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.redirect('/auth/login')
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        else res.redirect("/");
    });
}

const loginPage = (req, res) => {
    res.render('auth/login',
        {
            title: "Login",
            current_nav: ''
        }
    )
}

const signupPage = (req, res) => {
    res.render('auth/signup', {
        user: {},
        title: 'Регистрация',
    })
};

const checkAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login')
    }
    next()
}

const setAuthUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next()
}

const verify = async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
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

module.exports = {
    signup,
    logout,
    loginPage,
    signupPage,
    checkAuth,
    verify,
    setAuthUser
};
