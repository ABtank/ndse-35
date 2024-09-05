import { Injectable, Scope } from '@nestjs/common';
import { Book } from './interfaces/book.interfaces';

@Injectable({
  scope: Scope.DEFAULT,
})
export class BooksService {
  private readonly books: Book[] = [];

  create(book: Book) {
    this.books.push(book);
  }

  findAll(): Promise<Book[]> {
    return Promise.resolve(this.books);
  }
}
