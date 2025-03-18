import { isNullOrUndefined } from 'util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../../entities';
import { TodoDto, AddTodoDto, EditTodoDto } from '../../dto';
import { TodoMapperService } from '../todo-mapper/todo-mapper.service';

@Injectable()
export class TodoService {

  public constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    private readonly todoMapper: TodoMapperService
  ) { }

  public async findAll(filter?: { title?: string; completed?: boolean }): Promise<TodoDto[]> {
    const where: FindOptionsWhere<Todo> = {};

    if (filter?.title) {
      where.title = filter.title ? Like(`%${filter.title}%`) : undefined; // Use ILIKE equivalent for case-insensitive search
    }

    if (filter?.completed !== undefined) {
      where.completed = filter.completed;
    }
    const todos = await this.todoRepository.find({ where });
    return todos.map(this.todoMapper.modelToDto);
  }

  public async findOne(id: number): Promise<TodoDto> {
    const todo = await this.todoRepository.findOne(id);
    if (isNullOrUndefined(todo)) throw new NotFoundException();
    return this.todoMapper.modelToDto(todo);
  }


  public async add({ title }: AddTodoDto): Promise<TodoDto> {
    let todo = new Todo(title);
    todo = await this.todoRepository.save(todo);
    return this.todoMapper.modelToDto(todo);
  }

  public async edit(id: number, { title, completed }: EditTodoDto): Promise<TodoDto> {
    let todo = await this.todoRepository.findOne(id);

    if (isNullOrUndefined(todo)) throw new NotFoundException();

    todo.completed = completed;
    todo.title = title;

    todo = await this.todoRepository.save(todo);

    return this.todoMapper.modelToDto(todo);
  }

  public async remove(id: number): Promise<Todo> {
    let todo = await this.todoRepository.findOne(id);

    if (isNullOrUndefined(todo)) throw new NotFoundException();

    todo = await this.todoRepository.remove(todo);

    return todo;
  }

}
