import * as express from 'express';
import { Router } from 'express';
import fileBookMulter from '../middleware/file_book';
import { container, TYPES } from '../infrastructure/container';
import { BookController } from '../controllers/bookController';
import { ChatMessageController } from '../controllers/chatMessageController';

const router: Router = express.Router();
const bookController: BookController = container.get(BookController);
const chatMessageController: ChatMessageController = container.get(ChatMessageController);



router.get('/',
    (req, res, next) => bookController.get_book_list(req, res, next),
    (req: any, res: any) => {
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
    (req, res, next) => bookController.post_new_book(req, res, next),
    (req: any, res: any) => {
        const newBook = req.newBook;
        if (!newBook) res.redirect('/error/404');

        res.redirect('/books');
    })

router.get('/:id',
    (req, res, next) => bookController.checkBookIdUI(req, res, next),
    (req, res, next) => bookController.get_book(req, res, next),
    (req, res, next) => bookController.incr_book(req, res, next),
    chatMessageController.getList,
    (req: any, res: any) => {
        const { id } = req.params;
        let book = req.book;

        if (!book.id) res.redirect('/error/404');
        res.render('book/view', {
            title: "Книга | VIEW",
            current_nav: 'book',
            book: book,
            chatMessages: req.chatMessages || [],
            book_cnt: req.book_cnt || 0
        })

    })

router.get('/update/:id',
    (req, res, next) => bookController.checkBookIdUI(req, res, next),
    (req, res, next) => bookController.get_book(req, res, next),
    (req: any, res: any) => {
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
    (req, res, next) => bookController.checkBookIdUI(req, res, next),
    fileBookMulter.single('fileBook'),
    (req, res, next) => bookController.updateInfofileBook(req, res, next),
    (req, res, next) => bookController.put_book(req, res, next),
    (req, res, next) => bookController.get_book(req, res, next),
    (req: any, res: any) => {
        if (!req.book) res.redirect('/error/404');
        const { id } = req.params
        res.redirect(`/books/${id}`)
    })

router.post('/delete/:id',
    (req, res, next) => bookController.checkBookIdUI(req, res, next),
    (req, res, next) => bookController.delete(req, res, next),
    (req, res, next) => bookController.get_book(req, res, next),
    (req: any, res: any) => {
        if (req.book) {
            res.redirect('/error/404');
        } else {
            res.status(201)
            res.redirect('/books');
        }
    })

router.post(`/delete/:id/file_book`,
    (req, res, next) => bookController.checkBookIdUI(req, res, next),
    (req, res, next) => bookController.delete_file_book(req, res, next),
    (req, res, next) => bookController.get_book(req, res, next),
    (req: any, res: any) => {
        if (res.statusCode === 204) {
            res.status(201)
            if (!req.book) res.redirect('/error/404');
            // перенаправляем на предыдущую страницу
            res.redirect(req.get('referer') || '/');
        } else {
            res.status(404).redirect('/error/404');
        }
    })


export default router