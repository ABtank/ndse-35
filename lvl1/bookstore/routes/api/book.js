const express = require('express')
const { v4: uuid } = require('uuid')


const fileBookMulter = require('../../middleware/file_book')
const db_books = fileBookMulter.preservePath;
const { stor } = require('../../db/stor_book')
const { Book } = require('../../models/book')
const BookController = require("../../controllers/bookController")

function getFilesInDirectory(directory) {
    try {
        const files = fs.readdirSync(directory);
        return files;
    } catch (err) {
        console.error(err);
        return [];
    }
}


const router = express.Router()


// fileBook - имя ключа в форме по которому лежит файл
router.post('/:id/file_book',
    BookController.checkBookId,
    fileBookMulter.single('fileBook'),
    BookController.updateInfofileBook,
    BookController.get_book,
    (req, res) => {
        res.status(201).json(req.book)
    })


router.post(`/`,
    fileBookMulter.single('fileBook'),
    BookController.post_new_book,
    (req, res) => {
        res.status(201).json(req.newBook)
    })

// получение файла
router.get('/:id/download',
    BookController.checkBookId,
    (req, res) => {
        const { books } = stor
        const { id } = req.params
        const book = books[books.findIndex(el => el.id === id)]

        // const filesList = getFilesInDirectory(db_books);
        // const idx = filesList.findIndex(el => el.startsWith(id))
        // if (idx !== -1) {
        res.download(`${db_books}/${book.fileBook}`, `${book.fileName}`, err => {
            if (err) {
                res.status(404).json('404 | файл не найден');
            }
        })
        // }

    })


router.get(`/`,
    BookController.get_book_list,
    (req, res) => {
        res.json(req.book_list)
    })

router.get(`/:id`,
    BookController.get_book,
    (req, res) => {
        if (req.book) {
            res.json(req.book)
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })


router.put(`/:id`,
    BookController.checkBookId,
    fileBookMulter.single('fileBook'),
    BookController.updateInfofileBook,
    BookController.put_book,
    BookController.get_book,
    (req, res) => {
        if (req.book) {
            res.json(req.book)
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })

router.delete(`/:id`,
    BookController.delete, (req, res) => {
        if (res.statusCode === 204) {
            res.status(201)
            res.json('ok')
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })

router.delete(`/:id/file_book`,
    BookController.delete_file_book, (req, res) => {
        if (res.statusCode === 204) {
            res.status(201)
            res.json('ok')
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })


module.exports = router