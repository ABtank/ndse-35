interface Book {
    title: string,
    description: string,
    authors: string,
    favorite: boolean,
    fileCover: string,
    fileName: string,
    fileBook: string
}


abstract class BooksRepository {
    //— создание книги.
    createBook(book: Book) { }
    
    // — получение книги по id.
    getBook(id: string) { }
    
    //— получение всех книг.
    getBooks() { }
    
    // — обновление книги.
    updateBook(id: string) { }
    
    // — удаление книги.
    deleteBook(id: string) { }
    
    constructor() {

    }
}