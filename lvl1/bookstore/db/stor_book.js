const { v4: uuid } = require('uuid')


class Book {
    constructor(
        title = "",
        description = "",
        authors = "",
        favorite = "",
        fileCover = "",
        fileName = "",
        fileBook = "",
        id = uuid()
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
    }
}

const stor = {
    books: [
        new Book(),
        new Book("title2",
        "description",
        "authors",
        "favorite",
        "fileCover",
        "requirements.txt",
        "98bece82-a373-472e-a6e9-529c3480cfe3-requirements.txt",'98bece82-a373-472e-a6e9-529c3480cfe3')
    ]
};

module.exports.stor  = stor
module.exports.Book = Book