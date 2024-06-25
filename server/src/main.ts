import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3002',
    ],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);
}
bootstrap();
