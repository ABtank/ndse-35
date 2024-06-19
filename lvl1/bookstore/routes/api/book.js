const express = require('express')
const fileBookMulter = require('../../middleware/file_book')
const db_books = fileBookMulter.preservePath;
const BookController = require("../../controllers/bookController")
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
    BookController.bookfile_download)


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