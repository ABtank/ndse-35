const { stor } = require('../db/stor_book')
const { Book } = require('../models/book')
const fs = require('fs');
const fileBookMulter = require('../middleware/file_book')
const db_books = fileBookMulter.preservePath;

function getFilesInDirectory(directory) {
    try {
        const files = fs.readdirSync(directory);
        return files;
    } catch (err) {
        console.error(err);
        return [];
    }
}

class BookController {
    static get_book_list(req, res, next) {
        const { books } = stor
        req.book_list = books
        next()
    }
    // Проверка request.params.id
    static checkBookId(req, res, next) {
        const { id } = req.params || req.body
        if (!id) res.status(404).json('400 неправильный, некорректный запрос');
        else if (!stor.books[stor.books.findIndex(el => el.id === id)]) res.status(404).json('404 | книга не найдена');
        else next(); // если book есть, переходим к следующему middleware
    }
    // Проверка request.params.id
    static checkBookIdUI(req, res, next) {
        const { id } = req.params || req.body
        if (!id) res.redirect('/error/404');
        else if (!stor.books[stor.books.findIndex(el => el.id === id)]) res.redirect('/error/404');
        else next(); // если book есть, переходим к следующему middleware
    }
    // обновление информации о файле в книге
    static updateInfofileBook = (req, res, next) => {
        if (req.file) {
            const { books } = stor
            const { id } = req.params
            const idx = books.findIndex(el => el.id === id)
            if (books[idx].fileBook) {
                fs.unlink(`${db_books}/${books[idx].fileBook}`, (err) => {
                    if (err) res.status(500);
                });
            }
            const fileBook = req.file.filename
            const fileName = req.file.originalname
            books[idx] = {
                ...books[idx],
                fileBook,
                fileName
            }
        }
        next();
    }
    // получить книгу по id
    static get_book = (req, res, next) => {
        const { books } = stor
        const { id } = req.params
        const idx = books.findIndex(el => el.id === id)

        if (idx !== -1) req.book = books[idx]
        else res.status(404);
        next();
    }

    // создать книгу
    static post_new_book = (req, res, next) => {
        const { books } = stor;
        const {
            title,
            description,
            authors,
            favorite,
            fileCover } = req.body;
        let { id, fileBook, fileName } = req.body;

        if (req.file) {
            fileBook = req.file.filename
            fileName = req.file.originalname
            id = req.body.id
        }

        const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook, id)
        books.push(newBook)
        req.newBook = newBook;
        res.status(201)
        next();
    }

    // обновление полей книги без файла
    static put_book = (req, res, next) => {
        const { books } = stor
        const {
            title,
            description,
            authors,
            favorite } = req.body
        const { id } = req.params
        const idx = books.findIndex(el => el.id === id)

        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite
        }
        next();
    }

    static delete = (req, res, next) => {
        const { books: books } = stor
        const { id } = req.params
        const idx = books.findIndex(el => el.id === id)

        if (idx !== -1) {
            res.status(204);
            if (books[idx].fileBook) {
                fs.unlink(`${db_books}/${books[idx].fileBook}`, (err) => {
                    if (err) res.status(500);
                });
            }
            if (res.statusCode === 204) books.splice(idx, 1);
        } else {
            res.status(404)
        }
        next();
    }

    static delete_file_book = (req, res, next) => {
        const { books } = stor
        const { id } = req.params
        const idx = books.findIndex(el => el.id === id)

        if (idx !== -1 && books[idx].fileBook) {
            res.status(204)
            fs.unlink(`${db_books}/${books[idx].fileBook}`, (err) => {
                if (err) res.status(500);
            });
            books[idx].fileBook = ""
            books[idx].fileName = ""
        } else {
            res.status(404)
        }
        next();
    }
}

module.exports = BookController;