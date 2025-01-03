import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseInterceptors } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion/upper-and-fusion.pipe';
import { DurationInterceptor } from 'src/interceptors/duration/duration.interceptor';
//import { Request, Response } from 'express';

@UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {
constructor(
    private todoService: TodoService
)
{
    //this.todos=[]
}
//todos: Todo[];

/*@Get()
getTodos()
{
    return this.todos;
}*/

@Get()
getTodos(
    @Query() myPrams: GetPaginatedTodoDto
)
{
   // console.log(myPrams instanceof GetPaginatedTodoDto);
    return this.todoService.getTodos();
}

/*@Get(':id')
getTodo(
    @Param('id') id
)
{
    const todo = this.todos.find((Todo) => Todo.id === +id);
    if (todo) 
    {
        return todo;
    }
    throw new NotFoundException (`le id ${id} n\'existe pas`);

}*/
@Get(':id')
getTodo(@Param('id', new ParseIntPipe(
    {errorHttpStatusCode: HttpStatus.BAD_REQUEST})) id) {
  const todo = this.todoService.getTodoById(id);
  if (!todo) {
    throw new NotFoundException(`Todo with id ${id} does not exist.`);
  }
  return todo;
}

@Post()
addTodos(
    // @Body(ValidationPipe) newTodo: Todo
     @Body() newTodo: AddTodoDto

)
{
   return this.todoService.addTodos(newTodo);
}
@Delete(':id')
  deleteTodo(@Param('id',ParseIntPipe) id) {
    const result = this.todoService.deleteTodoById(id);
    console.log(result);
    if (!result) {
      throw new NotFoundException(`Todo with id ${id} does not exist.`);
    }
    return { message: `Todo with id ${id} successfully deleted.`, count: 1 };
  }

  @Put(':id')
  modifyTodos(@Param('id', ParseIntPipe) id, @Body() updatedTodo: Partial<AddTodoDto>) {
    const todo = this.todoService.updateTodoById(id, updatedTodo);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} does not exist.`);
    }
    return todo;
  }
  @Post('pipe')
  testPipe(
    //@Param('data' ,UpperAndFusionPipe) ParamData,
    @Body(UpperAndFusionPipe) data)
  {
    return data
  }
}
/*@Delete(':id')
deleteTodo(
    @Param('id') id : number
)
{
    const index = this.todos.findIndex((todo)=> todo.id == +id);
    if (index >=0)
    {
        this.todos.splice(index,1);
    }
    else
    {
        throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return {message: `le todo d'id ${id} ete supprimer avec succee` ,count: 1 }
}

@Put(':id')
modifierTodos(
    @Param ('id') id :number,
   // @Body() newTodo: Partial <Todo>
    @Body() newTodo: Partial <AddTodoDto>

)
{
    const todo = this.getTodo(id)
    todo.description= newTodo.description? newTodo.description : todo.description;
    todo.name= newTodo.name? newTodo.name :todo.name;
    return todo
}


}*/

/*addTodos(
    @Body() newTodo
)
{
    console.log(newTodo);
    console.log ('Ajouter un Todo la liste des todos');
    return 'Add TODO'
}*/

/*addTodos(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string, 
)
{
    console.log(id ,name ,description);
    console.log ('Ajouter un Todo la liste des todos');
    return 'Add TODO'
}*/
/*getTodos(
    @Req() request: Request,
    @Res() response: Response
)
{
    console.log ('Récupérer la liste des todos');
    response.status(200);
    response.json(
        {contenu : `Je suis une reponse generee a partir de l'objet Response de express`}
    )

getTodos()
{
   return 'Get TODOS'
}*/

/*@Get()
getTodos(
    @Query() myPrams
)
{
    console.log(myPrams)
    return this.todos;
}*/