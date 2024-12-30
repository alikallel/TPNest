import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AddTodoDto 
{
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message: 'le taille minimale de message est 6 caractere'})
    name: string;
    @IsString()
    @IsNotEmpty()
    description: string;

}