const express = require('express')
const { v4: uuid } = require('uuid')
const fs = require('fs');

const fileBookMulter = require('../../middleware/file_book')
const db_books = fileBookMulter.preservePath;
const { stor, Book } = require('../../db/stor_book')

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


// Проверка request.params.id
function checkBookId(req, res, next) {
    const { id } = req.params || req.body
    if (!id) res.status(404).json('400 неправильный, некорректный запрос');
    else if (!stor.books[stor.books.findIndex(el => el.id === id)]) res.status(404).json('404 | книга не найдена');
    else next(); // если book есть, переходим к следующему middleware
}

// fileBook - имя ключа в форме по которому лежит файл
router.post('/:id/file',
    checkBookId,
    fileBookMulter.single('fileBook'),
    (req, res) => {
        if (req.file) {
            const { books } = stor
            const { id } = req.params
            const idx = books.findIndex(el => el.id === id)
            const fileBook = req.file.filename
            const fileName = req.file.originalname
            books[idx] = {
                ...books[idx],
                fileBook,
                fileName
            }
            res.status(201).json(books[idx])
        }
    })


router.post(`/`, fileBookMulter.single('fileBook'),
    (req, res) => {
        const { books } = stor;
        const {
            title,
            description,
            authors,
            favorite,
            fileCover } = req.body;

        let id, fileBook, fileName;

        if (req.file) {
            fileBook = req.file.filename
            fileName = req.file.originalname
            id = req.body.id
        }

        const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook, id)
        books.push(newBook)

        res.status(201)
        res.json(newBook)
    })

// получение файла
router.get('/:id/download',
    checkBookId,
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


router.get(`/`, (req, res) => {
    const { books } = stor
    res.json(books)
})

router.get(`/:id`, (req, res) => {
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})


router.put(`/:id`, checkBookId, (req, res) => {
    const { books: books } = stor
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
    res.json(books[idx])
})

router.delete(`/:id`, (req, res) => {
    const { books: books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        if (books[idx].fileBook) {
            fs.unlink(`${db_books}/${books[idx].fileBook}`, (err) => {
                if (err) {
                    res.status(500).send('Ошибка при удалении файла');
                    return;
                }
            });
        }
        books.splice(idx, 1)
        // res.status(204)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})


module.exports = router