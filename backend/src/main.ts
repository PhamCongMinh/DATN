import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import * as dotenv from 'dotenv';

import { EEnvKey } from '@constants/env.constant';

import { ResponseTransformInterceptor } from '@shared/interceptors/request-response.interceptor';
import { useMorgan } from '@shared/middleware';
import { HttpExceptionFilter } from '@shared/middleware/http-exception.filter';
import { UnknownExceptionsFilter } from '@shared/middleware/unknown-exceptions.filter';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { BodyValidationPipe } from '@shared/pipes/validation.pipe';
import { initSwagger } from '@shared/swagger';

import { AppModule } from './app.module';
import { join } from 'path';
// import * as image from './upload/house.jpeg';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const loggingService = app.get(LoggerService);
  const logger = loggingService.getLogger('Main');
  app.useGlobalInterceptors(new ResponseTransformInterceptor(loggingService));
  app.useGlobalFilters(
    new UnknownExceptionsFilter(loggingService, configService),
  );
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  app.useGlobalPipes(new BodyValidationPipe());
  app.setGlobalPrefix(configService.get<string>(EEnvKey.GLOBAL_PREFIX));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(useMorgan(loggingService.logger.access));
  initSwagger(app, configService);
  app.use('/assets', express.static('assets'));
  // app.use(express.static('@upload'));
  // app.use('src/upload', express.static('src/upload'));
  // app.useStaticAssets(join(__dirname, 'upload'), {
  //   index: false,
  //   prefix: '/upload',
  // });
  // app.use('/upload', express.static('./upload'));
  // app.use('/upload', express.static(join(__dirname, '..', 'upload')));
  // app.useStaticAssets(join(__dirname, '..', 'upload'), {
  //   prefix: '/upload/',
  // });
  // app.use('/upload', express.static(join(process.cwd(), 'upload')));
  // app.use(express.static(join(__dirname, '../upload')));
  // app.useStaticAssets(join(__dirname, '..', '\\upload'));

  await app.listen(configService.get<number>(EEnvKey.PORT) || 3000);

  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

// join(__dirname, '..', 'upload')
