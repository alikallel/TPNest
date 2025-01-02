import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './middlewares/logger.middleware';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.use((req: Request, res: Response, next)=>{console.log('middleware  from main');next()})
  app.useGlobalPipes(new ValidationPipe (
    {
      transform :true,
      whitelist:true,
      forbidNonWhitelisted :true
    }
  ));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
