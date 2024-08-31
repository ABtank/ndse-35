import { Schema, model, Document } from 'mongoose';
import { Book } from '../dto/book';

// Создаем схему книги
const bookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    authors: { type: String, default: "" },
    favorite: { type: Boolean, default: false },
    fileCover: { type: String, default: "" },
    fileName: { type: String, default: "" },
    fileBook: { type: String, default: "" }
});

// Экспортируем модель книги
export const BookModel = model<Book & Document>("Book", bookSchema);
