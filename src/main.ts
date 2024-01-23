import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import * as cookieParser from 'cookie-parser';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { GlobalHttpExceptionFilter } from 'src/shared/filters/global-http-exception.filter';
import { GlobalAxiosExceptionFilter } from 'src/shared/filters/global-axios-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.useGlobalFilters(new GlobalAxiosExceptionFilter());
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  await app.listen(3500);
}
bootstrap();
