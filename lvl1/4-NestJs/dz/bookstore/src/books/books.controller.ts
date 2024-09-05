import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book, CreateBookDto } from './interfaces/book.interfaces';
import { BookImpl } from 'src/data/book.impl';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  fildAll(): Promise<Book[]> {
    const book = new BookImpl();
    book.title = 'Post book_title';
    book.description = 'Post book_description';
    book.authors = ['Post book_authors'];
    book.favorite = false;
    this.bookService.create(book);
    return this.bookService.findAll();
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    const book = new BookImpl();
    book.title = createBookDto.title || 'Post book_title';
    book.description = createBookDto.description || 'Post book_description';
    book.authors = createBookDto.authors || ['Post book_authors'];
    book.favorite = createBookDto.favorite || false;
    this.bookService.create(book);
    this.bookService.findAll();
  }
}
