import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { UpdateBookDto } from './interfaces/dto/update-book';
import { CreateBookDto } from './interfaces/dto/create-book';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public create(data: CreateBookDto): Promise<BookDocument> {
    const todo = new this.BookModel(data);
    return todo.save();
  }

  public getAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }
  public update(id: string, data: UpdateBookDto): Promise<BookDocument[]> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data);
  }
  public delete(id: string): Promise<BookDocument[]> {
    return this.BookModel.findOneAndDelete({ _id: id });
  }
}
