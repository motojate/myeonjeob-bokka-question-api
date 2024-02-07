import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import * as cookieParser from 'cookie-parser';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { GlobalHttpExceptionFilter } from 'src/shared/filters/global-http-exception.filter';
import { GlobalAxiosExceptionFilter } from 'src/shared/filters/global-axios-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('면접보까 학습 서비스 api')
    .setDescription('면접보까의 핵심 유저 서비스를 제공합니다.')
    .setVersion('1.0')
    .addTag('면접보까')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3500);
}
bootstrap();
