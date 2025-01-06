import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserSubscribeDto } from './dto/usersubscribe.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/logincredentials.dto';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor (
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
    ){}
   async  subscribe(userData: UserSubscribeDto) : Promise <Partial<UserEntity>>
    {
        const user = this.userRepository.create(
           {...userData}
        )
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        try{

            await this.userRepository.save(user);
        } catch(e)
        {
            throw new ConflictException ('Le username et le password doit etre unique')
        }
        
        return {
            id: user.id,
            username: user.username,
            email: user.email,
        };        
    }

    async login(credentials: LoginCredentialsDto) 
    {
        const{username,password}= credentials;
        const user = await this.userRepository.createQueryBuilder("user").where ("user.username = :username or user.email= :username",{username}).getOne();
        if (!user)
        {
            throw new NotFoundException ('Incorrect username or password');
        }
        const hashedPassword =await bcrypt.hash (password , user.salt);
        if (hashedPassword === user.password)
        {
            const payload ={
                username,
                email: user.email,
                role: user.role,
            };    
            const jwt = await this.jwtService.sign(payload);
            return {
                "access_token" :jwt
            };    
        }
        else
        {
            throw new NotFoundException ('Incorrect username or password');

        }
        
    }
}
