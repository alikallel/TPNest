import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './middlewares/logger.middleware';
import * as morgan from 'morgan';
import { DurationInterceptor } from './interceptors/duration/duration.interceptor';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService =app.get(ConfigService);
  const corsOptions ={
    origin:['http://localhost:4200']
  }
  app.enableCors(corsOptions);
  app.use(morgan('dev'));
  app.use((req: Request, res: Response, next)=>{console.log('middleware  from main');next()})
  app.useGlobalPipes(new ValidationPipe (
    {
      transform :true,
      whitelist:true,
      forbidNonWhitelisted :true
    }
  ));
  //main.ts pas de dans mle context de module (pas bootsrap de l'application nest pas encore commancer a travailler) => sol : new instance
  app.useGlobalInterceptors (new DurationInterceptor());
  //await app.listen(process.env.APP_PORT );
  await app.listen(configService.get('APP_PORT'));

}
bootstrap();
