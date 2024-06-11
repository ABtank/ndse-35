const { Book } = require('../models/book')

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