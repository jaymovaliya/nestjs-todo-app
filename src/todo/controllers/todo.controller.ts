import { TodoService } from './../services/todo/todo.service';
import { TodoDto, AddTodoDto, EditTodoDto } from './../dto';

import {
  Controller, 
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
  Query
} from '@nestjs/common';


@Controller('todos')
export class TodoController {

  public constructor(private readonly todoService: TodoService) {}

  @Get()
  public findAll(
    @Query('title') title?: string,
    @Query('completed') completed?: string,
  ): Promise<TodoDto[]> {
    const isCompleted = completed !== undefined ? completed === 'true' : undefined;
    return this.todoService.findAll({ title, completed: isCompleted });
  }

  @Get(':id')
  public findOne(@Param('id') id: number): Promise<TodoDto> {
      return this.todoService.findOne(id);
  }

  @Put(':id')
  public edit(@Param('id') id: number, @Body() todo: EditTodoDto): Promise<TodoDto> {
      return this.todoService.edit(id, todo);
  }

  @Post()
  public add(@Body() todo: AddTodoDto): Promise<TodoDto> {
      return this.todoService.add(todo);
  }

  @Delete(':id')
  public remove(@Param('id') id: number): Promise<TodoDto> {
      return this.todoService.remove(id);
  }

}
