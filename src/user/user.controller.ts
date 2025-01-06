import { Body, Controller, Post } from '@nestjs/common';
import { UserSubscribeDto } from './dto/usersubscribe.dto';
import { UserEntity } from './entities/user.entity/user.entity';
import { UserService } from './user.service';
import { LoginCredentialsDto } from './dto/logincredentials.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    )
    {}
    @Post()
    subscribe(
        @Body() userData : UserSubscribeDto
    ) : Promise <Partial<UserEntity>>
    {
        return this.userService.subscribe(userData)
    }

    @Post('login')
    login(
        @Body() Credentials : LoginCredentialsDto
    )
    {
        return this.userService.login(Credentials)
    }
}
