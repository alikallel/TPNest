import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === +id);
  }

  addTodos(newTodo: AddTodoDto): Todo {
    const { name, description } = newTodo;
    const id = this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1;
    const todo: Todo = {
      id,
      name,
      description,
      createdAt: new Date()
    };
    this.todos.push(todo);
    return todo;
  }

  deleteTodoById(id: number): boolean {
    const index = this.todos.findIndex((todo) => todo.id === +id);
    if (index >= 0) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }

  updateTodoById(id: number, updatedTodo: Partial<AddTodoDto>): Todo | undefined {
    const todo = this.getTodoById(id);
    if (todo) {
      todo.name = updatedTodo.name ?? todo.name;
      todo.description = updatedTodo.description ?? todo.description;
      return todo;
    }
    return undefined;
  }
}
