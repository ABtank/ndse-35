"use strict";
require('reflect-metadata');
const { Container, decorate, injectable } = require("inversify")
const { BookController } = require("./controllers/bookController")
const container = new Container();

const TYPES = {
    BookController: Symbol.for('BookController')
};

decorate(injectable(), BookController);
container.bind(TYPES.BookController).to(BookController);



// ERROR BookController.get_book_list is not a function
console.log(BookController)
// [class BookController] {
    //    updateInfofileBook: [AsyncFunction: updateInfofileBook],
    //    get_book: [AsyncFunction: get_book],
    //    post_new_book: [AsyncFunction: post_new_book],
    //    put_book: [AsyncFunction: put_book],
    //    delete: [AsyncFunction: delete],
    //    delete_file_book: [AsyncFunction: delete_file_book],
    //    bookfile_download: [AsyncFunction: bookfile_download]
    //  }
    
const service = container.get(TYPES.BookController);
console.log(service)
// BookController {}



module.exports = { container, TYPES };