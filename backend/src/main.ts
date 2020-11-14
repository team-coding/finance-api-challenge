import { NestFactory } from '@nestjs/core';
import {json, urlencoded} from 'body-parser'
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  await app.listen(3000);
}
bootstrap();
