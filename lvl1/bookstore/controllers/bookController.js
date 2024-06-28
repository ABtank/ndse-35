const Book = require('../models/book')
const axios = require('axios');
const fs = require('fs');
const fileBookMulter = require('../middleware/file_book')
const db_books = fileBookMulter.preservePath;
const COUNTER_URL = process.env.COUNTER_URL || 'http://counter:3002';

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
    static async get_book_list(req, res, next) {
        req.book_list = await Book.find().select('-__v');
        next()
    }
    static async incr_book(req, res, next) {
        const { id } = req.params || req.body;
        if (id) {
            try {
                const response = await axios.post(`${COUNTER_URL}/counter/${id}/incr`);
                req.book_cnt = response.data.cnt;
                console.log('Counter incremented:', response.data);
            } catch (error) {
                console.error('Error incrementing counter:', error);
            }
        }
        next()
    }
    // Проверка request.params.id
    static async checkBookId(req, res, next) {
        const { id } = req.params || req.body
        if (!id) res.status(404).json('400 неправильный, некорректный запрос');
        else if (!await Book.findById(id).select('-__v')) res.status(404).json('404 | книга не найдена');
        else next(); // если book есть, переходим к следующему middleware
    }
    // Проверка request.params.id
    static async checkBookIdUI(req, res, next) {
        const { id } = req.params || req.body
        if (!id) res.redirect('/error/404');
        else if (!await Book.findById(id).select('-__v')) res.redirect('/error/404');
        else next(); // если book есть, переходим к следующему middleware
    }
    // обновление информации о файле в книге
    static updateInfofileBook = async (req, res, next) => {
        if (req.file) {
            const { id } = req.params
            const book = await Book.findById(id).select('-__v')
            if (book.fileBook) {
                fs.unlink(`${db_books}/${book.fileBook}`, (err) => {
                    if (err) res.status(500);
                });
            }
            const fileBook = req.file.filename
            const fileName = req.file.originalname
            await Book.findByIdAndUpdate(id, { fileBook, fileName });
        }
        next();
    }
    // получить книгу по id
    static get_book = async (req, res, next) => {
        const { id } = req.params
        const book = await Book.findById(id).select('-__v')
        if (book) req.book = book
        else res.status(404);
        next();
    }

    // создать книгу
    static post_new_book = async (req, res, next) => {
        const {
            title,
            description,
            authors,
            favorite,
            fileCover } = req.body;
        let { fileBook, fileName } = req.body;

        if (req.file) {
            fileBook = req.file.filename
            fileName = req.file.originalname
        }

        const newBook = new Book({ title, description, authors, favorite, fileCover, fileName, fileBook })
        await newBook.save();
        req.newBook = newBook;
        res.status(201)
        next();
    }

    // обновление полей книги без файла
    static put_book = async (req, res, next) => {
        const {
            title,
            description,
            authors,
            favorite } = req.body
        const { id } = req.params

        await Book.findByIdAndUpdate(id, {
            title,
            description,
            authors,
            favorite: Boolean(favorite || false)
        });

        next();
    }

    static delete = async (req, res, next) => {
        const { id } = req.params
        const book = await Book.findById(id).select('-__v')
        const fileBook = book.fileBook;
        res.status(204);

        if (book) {
            if (fileBook) {
                fs.unlink(`${db_books}/${fileBook}`, (err) => {
                    if (err) res.status(500);
                });
            }
            if (res.statusCode === 204) {
                try {
                    await Book.deleteOne({ _id: id })
                } catch (e) {
                    console.log(e)
                    res.status(500);
                }
            }
        }
        next();
    }

    static delete_file_book = async (req, res, next) => {
        const { id } = req.params
        const book = await Book.findById(id).select('-__v')

        if (book != null && book.fileBook) {
            res.status(204)
            fs.unlink(`${db_books}/${book.fileBook}`, (err) => {
                if (err) res.status(500);
            });
            const fileBook = ""
            const fileName = ""
            await Book.findByIdAndUpdate(id, { fileBook, fileName });
        } else {
            res.status(404)
        }
        next();
    }

    static bookfile_download = async (req, res) => {
        const { id } = req.params
        const book = await Book.findById(id).select('-__v')
        if (book != null && book.fileBook) {
            res.download(`${db_books}/${book.fileBook}`, `${book.fileName}`, err => {
                if (err) {
                    res.status(404).json('404 | файл не найден');
                }
            })
        }
    }
}

module.exports = BookController;