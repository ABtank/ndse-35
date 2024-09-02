import { Book } from 'src/books/interfaces/book.interfaces';

export class BookImpl implements Book {
  description: string;
  authors: string[];
  favorite: boolean;
  fileCover: string;
  fileName: string;
  fileBook: string;
  title: string;
  public type = 'simple book';
}
