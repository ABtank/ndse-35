const express = require('express');
const router = express.Router();
const fileBookMulter = require('../middleware/file_book')
const BookController = require("../controllers/bookController")


router.get('/',
    BookController.get_book_list,
    (req, res) => {
        res.render('book', {
            title: "Книги",
            current_nav: 'books',
            books: req.book_list || []
        })
    })

router.get('/create',
    (req, res) => {
        res.render('book/create', { title: "create Todo", book: {} });
    })

router.post('/create',
    fileBookMulter.single('fileBook'),
    BookController.post_new_book,
    (req, res) => {
        const newBook = req.newBook;
        if (!newBook) res.redirect('/error/404');

        res.redirect('/books');
    })

router.get('/:id',
    BookController.checkBookIdUI,
    BookController.get_book,
    BookController.incr_book,
    (req, res) => {
        const { id } = req.params;
        const url = `api/books/${id}`;
        let book = req.book;

        if (!book.id) res.redirect('/error/404');
        res.render('book/view', {
            title: "Книга | VIEW",
            current_nav: 'book',
            book: book,
            book_cnt: req.book_cnt || 0
        })

    })

router.get('/update/:id',
    BookController.checkBookIdUI,
    BookController.get_book,
    (req, res) => {
        const { id } = req.params;
        const url = `api/books/${id}`;
        let book = req.book;


        if (!book) res.redirect('/error/404');
        res.render('book/update', {
            title: "Книга | Update",
            current_nav: 'book',
            book: book
        })
    })

router.post('/update/:id',
    BookController.checkBookIdUI,
    fileBookMulter.single('fileBook'),
    BookController.updateInfofileBook,
    BookController.put_book,
    BookController.get_book,
    (req, res) => {
        if (!req.book) res.redirect('/error/404');
        const { id } = req.params
        res.redirect(`/books/${id}`)
    })

router.post('/delete/:id',
    BookController.checkBookIdUI,
    BookController.delete,
    BookController.get_book,
     (req, res) => {
        if (req.book) {
            res.redirect('/error/404');
        } else {
            res.status(201)
            res.redirect('/books');
        }
    })

router.post(`/delete/:id/file_book`,
    BookController.checkBookIdUI,
    BookController.delete_file_book,
    BookController.get_book,
    (req, res) => {
        if (res.statusCode === 204) {
            res.status(201)
            if (!req.book) res.redirect('/error/404');
            // перенаправляем на предыдущую страницу
            res.redirect(req.get('referer') || '/');
        } else {
            res.status(404).redirect('/error/404');
        }
    })


module.exports = router