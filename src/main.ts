import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const port = process.env.NODE_PORT || 3000;

  const app = await NestFactory.create(AppModule);

  //validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  //swagger
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/swagger', app, swaggerDocument);

  await app.listen(port);
  console.log(`Server started on http://localhost:${port}`);
}

bootstrap();
