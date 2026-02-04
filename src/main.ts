import { NestFactory } from '@nestjs/core';
import fastifyCookie from '@fastify/cookie';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { env } from './config/env';
import { Logger } from '@nestjs/common';
import { globalValidationExceptionFactory } from './core/exceptions/exception-factory';
import { AllExceptionsFilter } from './core/exceptions/exception-filter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import qs from 'qs';

async function bootstrap() {
  try {
    const metadata = require('./metadata');
    await SwaggerModule.loadPluginMetadata(metadata.default);
  } catch (e) {}

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      querystringParser: (str) => qs.parse(str),
    }),
    {
      cors: true,
    },
  );

  app.setGlobalPrefix('api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Livestock API')
    .setDescription('API documentation for Livestock project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  app.use(
    '/reference',
    apiReference({
      spec: {
        content: swaggerDocument,
      },
      withFastify: true,
    }),
  );

  await app.register(fastifyCookie as any, {
    secret: env.JWT_SECRET,
  });

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
      transform: true,
      exceptionFactory: globalValidationExceptionFactory,
    }),
  );

  const logger = app.get(Logger);
  app.useLogger(logger);

  logger.debug(`Livestock Backend is running on port ${env.PORT}`);
  await app.listen(env.PORT, '0.0.0.0');
}
void bootstrap();
