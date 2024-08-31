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
    abstract createBook(book: Book) : Promise<any>;
    
    // — получение книги по id.
    abstract getBook(id: string) : Promise<any>;
    
    //— получение всех книг.
    abstract getBooks() : Promise<any>;
    
    // — обновление книги.
    abstract updateBook(id: string) : Promise<any>;
    
    // — удаление книги.
    abstract deleteBook(id: string) : Promise<any>;
    

}