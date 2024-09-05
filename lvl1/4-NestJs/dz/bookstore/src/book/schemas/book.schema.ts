import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: [String], required: false })
  authors: string[];

  @Prop({ default: false })
  favorite: boolean;

  @Prop({ required: false })
  fileCover: string;

  @Prop({ required: false })
  fileName: string;

  @Prop({ required: false })
  fileBook: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
