import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  const port = process.env.NODE_PORT || 3000;
  await app.listen(port);
  console.log(`Server started on http://localhost:${port}`);
}

bootstrap();
