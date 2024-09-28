import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDocument } from './schemas/book.schema';
import { IparamId } from './interfaces/param-id';
import { UpdateBookDto } from './interfaces/dto/update-book';
import { CreateBookDto } from './interfaces/dto/create-book';
import { ResponseInterceptor } from 'src/response.interceptor';
import { ValidateCreateBookDtoPipe } from './validate.createbookdto.pipe';
import { JoiValidationUpdateBookPipe } from './interfaces/validation/joi.validation.updatebook.pipe';

@UseInterceptors(ResponseInterceptor)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(ValidateCreateBookDtoPipe)
  public create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return Promise.resolve(this.bookService.create(body));
  }

  @Get()
  getAll(): Promise<BookDocument[]> {
    return this.bookService.getAll();
  }

  @Put(':id')
  update(
    @Param() { id }: IparamId,
    @Body(JoiValidationUpdateBookPipe) body: UpdateBookDto,
  ): Promise<BookDocument[]> {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  delete(@Param() { id }: IparamId): Promise<BookDocument[]> {
    return this.bookService.delete(id);
  }
}
