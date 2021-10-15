import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './providers/exceptionFilters/HttpExceptionFilter';
import { DtoInterceptor } from './providers/interceptors/DTO.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new DtoInterceptor());
  await app.listen(3000);
}
bootstrap();
