import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { env } from './config/env';
import { Logger } from '@nestjs/common';
import { globalValidationExceptionFactory } from './core/exceptions/exception-factory';
import { AllExceptionsFilter } from './core/exceptions/exception-filter';

async function bootstrap() {
  const logger = new Logger('Base Backend')

  const app = await NestFactory.create(AppModule, { cors: true });
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

  logger.log(`Base Backend is running on port ${env.PORT}`);
  await app.listen(env.PORT);
}
void bootstrap();  
