import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';

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
  app.useGlobalFilters(new HttpExceptionFilter()), // Catch Exceptions with Filters
  app.useGlobalGuards(new ApiKeyGuard()) // Protect Routes with Guards

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
