import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'

dotenv.config();
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{
      expiresIn: 3600
    }
  })
],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
