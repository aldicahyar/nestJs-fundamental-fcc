/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Setup Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Spotify-Clone API')
    .setDescription('Learning NestJS by course Free code Camp a Spotify-Clone API')
    .setVersion('1.0')
    .addTag('Spotify-Clone')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3999);
}
bootstrap();
