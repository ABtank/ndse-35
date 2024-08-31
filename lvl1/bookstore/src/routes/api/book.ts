import * as express from 'express';
import fileBookMulter from '../../middleware/file_book';
import { container } from '../../infrastructure/container';
import { Router } from 'express';
import { BookController } from '../../controllers/bookController';
const bookController: BookController = container.get(BookController);

const router: Router = express.Router();



// fileBook - имя ключа в форме по которому лежит файл
router.post('/:id/file_book',
    (req, res, next) => bookController.checkBookId(req, res, next),
    fileBookMulter.single('fileBook'),
    (req, res, next) => bookController.updateInfofileBook(req, res, next),
    (req, res, next) => bookController.get_book(req, res, next),
    (req: any, res: any) => {
        res.status(201).json(req.book)
    })


router.post(`/`,
    fileBookMulter.single('fileBook'),
    (req, res, next) => bookController.post_new_book(req, res, next),
    (req: any, res: any) => {
        res.status(201).json(req.newBook)
    })

// получение файла
router.get('/:id/download',
    (req, res, next) => bookController.checkBookId(req, res, next),
    (req, res) => bookController.bookfile_download)


router.get(`/`,
    (req, res, next) => bookController.get_book_list(req, res, next),
    (req: any, res: any) => {
        res.json(req.book_list)
    })

router.get(`/:id`,
    (req, res, next) => bookController.get_book(req, res, next),
    (req: any, res: any) => {
        if (req.book) {
            res.json(req.book)
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })


router.put(`/:id`,
    (req, res, next) => bookController.checkBookId,
    fileBookMulter.single('fileBook'),
    (req, res, next) => bookController.updateInfofileBook(req, res, next),
    (req, res, next) => bookController.put_book(req, res, next),
    (req, res, next) => bookController.get_book(req, res, next),
    (req: any, res: any) => {
        if (req.book) {
            res.json(req.book)
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })

router.delete(`/:id`,
    (req, res, next) => bookController.delete(req, res, next),
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
    (req, res, next) => bookController.delete_file_book(req, res, next),
    (req, res) => {
        if (res.statusCode === 204) {
            res.status(201)
            res.json('ok')
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    })


export default router