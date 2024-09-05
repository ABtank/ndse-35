import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './interfaces/dto/create-todo';
import { IparamId } from './interfaces/param-id';
import { UpdateTodoDto } from './interfaces/dto/update-todo';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  public create(@Body() body: CreateTodoDto): Promise<TodoDocument> {
    return Promise.resolve(this.todoService.create(body));
  }

  @Get()
  getAll(): Promise<TodoDocument[]> {
    return this.todoService.getAll();
  }

  @Put(':id')
  update(
    @Param() { id }: IparamId,
    @Body() body: UpdateTodoDto,
  ): Promise<TodoDocument[]> {
    return this.todoService.update(id, body);
  }

  @Delete(':id')
  delete(@Param() { id }: IparamId): Promise<TodoDocument[]> {
    return this.todoService.delete(id);
  }
}
