import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Label buddy API')
  .setDescription('Label buddy API responses')
  .setVersion('1.0')
  .addTag('Languages')
  .addTag('Products')
  .addTag('Crops')
  .build();
