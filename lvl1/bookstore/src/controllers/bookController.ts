import { BookModel } from '../models/book';
import { Book } from '../dto/book';
import axios from 'axios';
import * as fs from 'fs';
import fileBookMulter from '../middleware/file_book';
// const db_books = fileBookMulter.dist;
const db_books: string = '../../files/books';
const COUNTER_URL = process.env.COUNTER_URL || 'http://counter:3002';

function getFilesInDirectory(directory: any) {
    try {
        const files = fs.readdirSync(directory);
        return files;
    } catch (err) {
        console.error(err);
        return [];
    }
}


interface CreateBookDto {
    title: Book['title'];
    description: Book['description'];
    authors: Book['authors'];
    favorite: Book['favorite'];
    fileCover: Book['fileCover'];
    fileName: Book['fileName'];
    fileBook: Book['fileBook'];
}



export class BookController {

    constructor() {
        console.log('constructor BOOKS_CONTROLLER');
    }

    async get_book_list(req: any, res: any, next: any) {
        req.book_list = await BookModel.find().select('-__v');
        next()
    }
    async incr_book(req: any, res: any, next: any) {
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
    async checkBookId(req: any, res: any, next: any) {
        const { id } = req.params || req.body
        if (!id) res.status(404).json('400 неправильный, некорректный запрос');
        else if (!await BookModel.findById(id).select('-__v')) res.status(404).json('404 | книга не найдена');
        else next(); // если book есть, переходим к следующему middleware
    }
    // Проверка request.params.id
    async checkBookIdUI(req: any, res: any, next: any) {
        const { id } = req.params || req.body
        if (!id) res.redirect('/error/404');
        else if (!await BookModel.findById(id).select('-__v')) res.redirect('/error/404');
        else next(); // если book есть, переходим к следующему middleware
    }
    // обновление информации о файле в книге
    updateInfofileBook = async (req: any, res: any, next: any) => {
        if (req.file) {
            const { id } = req.params
            const book = await BookModel.findById(id).select('-__v')
            if (book?.fileBook) {
                fs.unlink(`${db_books}/${book.fileBook}`, (err: any) => {
                    if (err) res.status(500);
                });
            }
            const fileBook = req.file.filename
            const fileName = req.file.originalname
            await BookModel.findByIdAndUpdate(id, { fileBook, fileName });
        }
        next();
    }
    // получить книгу по id
    get_book = async (req: any, res: any, next: any) => {
        const { id } = req.params
        const book = await BookModel.findById(id).select('-__v')
        if (book) {
            req.book = book;
            req.roomId = book._id;
        }
        else res.status(404);
        next();
    }

    // создать книгу
    post_new_book = async (req: any, res: any, next: any) => {
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

        const newBook = new BookModel({ title, description, authors, favorite, fileCover, fileName, fileBook })
        await newBook.save();
        req.newBook = newBook;
        res.status(201)
        next();
    }

    // обновление полей книги без файла
    put_book = async (req: any, res: any, next: any) => {
        const {
            title,
            description,
            authors,
            favorite } = req.body
        const { id } = req.params

        await BookModel.findByIdAndUpdate(id, {
            title,
            description,
            authors,
            favorite: Boolean(favorite || false)
        });

        next();
    }

    delete = async (req: any, res: any, next: any) => {
        const { id } = req.params
        const book = await BookModel.findById(id).select('-__v')
        const fileBook = book?.fileBook;
        res.status(204);

        if (book) {
            if (fileBook) {
                fs.unlink(`${db_books}/${fileBook}`, (err: any) => {
                    if (err) res.status(500);
                });
            }
            if (res.statusCode === 204) {
                try {
                    await BookModel.deleteOne({ _id: id })
                } catch (e) {
                    console.log(e)
                    res.status(500);
                }
            }
        }
        next();
    }

    delete_file_book = async (req: any, res: any, next: any) => {
        const { id } = req.params
        const book = await BookModel.findById(id).select('-__v')

        if (book != null && book.fileBook) {
            res.status(204)
            fs.unlink(`${db_books}/${book.fileBook}`, (err: any) => {
                if (err) res.status(500);
            });
            const fileBook = ""
            const fileName = ""
            await BookModel.findByIdAndUpdate(id, { fileBook, fileName });
        } else {
            res.status(404)
        }
        next();
    }

    bookfile_download = async (req: any, res: any) => {
        const { id } = req.params
        const book = await BookModel.findById(id).select('-__v')
        if (book != null && book.fileBook) {
            res.download(`${db_books}/${book.fileBook}`, `${book.fileName}`, (err: any) => {
                if (err) {
                    res.status(404).json('404 | файл не найден');
                }
            })
        }
    }
}