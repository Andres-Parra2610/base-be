import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { env } from './config/env';
import { Logger } from '@nestjs/common';
import { globalValidationExceptionFactory } from './core/exceptions/exception-factory';
import { AllExceptionsFilter } from './core/exceptions/exception-filter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    {
      cors: true
    }
  );
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  }));

  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: globalValidationExceptionFactory,
    }),
  )

  const logger = app.get(Logger)
  app.useLogger(logger)

  logger.log(`Base Backend is running on port ${env.PORT}`);
  await app.listen(env.PORT, '0.0.0.0');
}
void bootstrap();  
