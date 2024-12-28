import { Body, Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
//import { Request, Response } from 'express';

@Controller('todo')
export class TodoController {
constructor()
{
    this.todos=[]
}
todos: Todo[];
@Get()
getTodos()
{
    return this.todos;
}

@Post()
addTodos(
    @Body() newTodo: Todo
)
{
    if (this.todos.length)
    {
        newTodo.id = this.todos[this.todos.length-1].id+1;
    }
    else
    {
        newTodo.id=1;
    }
    this.todos.push(newTodo);
    return newTodo;
}

@Delete()
deleteTodos()
{
    console.log ('Delete un Todo la liste des todos');
    return 'Delete TODO'
}

@Put()
modifierTodos()
{
    console.log ('Modifier l\'un des todo de la liste des todos');
    return 'Update TODO'
}


}

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