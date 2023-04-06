import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Sencacional https://learn.nestjs.com/courses/591712/lectures/23192390
    transform: true, // 👈   console.log(createCoffeeDto instanceof CoffeesController)
    forbidUnknownValues: true, // Sencacional https://learn.nestjs.com/courses/591712/lectures/23192390
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  await app.listen(3000);
}
bootstrap();
