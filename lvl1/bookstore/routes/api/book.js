const express = require('express')
const fileBookMulter = require('../../middleware/file_book')
const db_books = fileBookMulter.preservePath;
const { container, TYPES } = require("../../container");
const BookController = container.get(TYPES.BookController);
const router = express.Router()



// fileBook - имя ключа в форме по которому лежит файл
router.post('/:id/file_book',
    (req, res, next) => BookController.checkBookId(req, res, next),
    fileBookMulter.single('fileBook'),
    (req, res, next) => BookController.updateInfofileBook(req, res, next),
    (req, res, next) => BookController.get_book(req, res, next),
    (req, res) => {
        res.status(201).json(req.book)
    })


router.post(`/`,
    fileBookMulter.single('fileBook'),
    (req, res, next) => BookController.post_new_book(req, res, next),
    (req, res) => {
        res.status(201).json(req.newBook)
    })

// получение файла
router.get('/:id/download',
    (req, res, next) => BookController.checkBookId(req, res, next),
    (req, res) => BookController.bookfile_download)


router.get(`/`,
    (req, res, next) => BookController.get_book_list(req, res, next),
    (req, res) => {
        res.json(req.book_list)
    })

router.get(`/:id`,
    (req, res, next) => BookController.get_book(req, res, next),
    (req, res) => {
        if (req.book) {
            res.json(req.book)
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })


router.put(`/:id`,
    (req, res, next) => BookController.checkBookId,
    fileBookMulter.single('fileBook'),
    (req, res, next) => BookController.updateInfofileBook(req, res, next),
    (req, res, next) => BookController.put_book(req, res, next),
    (req, res, next) => BookController.get_book(req, res, next),
    (req, res) => {
        if (req.book) {
            res.json(req.book)
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })

router.delete(`/:id`,
    (req, res, next) => BookController.delete(req, res, next),
    (req, res) => {
        if (res.statusCode === 204) {
            res.status(201)
            res.json('ok')
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })

router.delete(`/:id/file_book`,
    (req, res, next) => BookController.delete_file_book(req, res, next),
    (req, res) => {
        if (res.statusCode === 204) {
            res.status(201)
            res.json('ok')
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })


module.exports = router