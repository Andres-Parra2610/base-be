import { ApplicationError } from '@/src/utils/errors/application.error';
import {
  DatabaseError,
  ForeignKeyConstraintError,
  InvalidDataError,
  UniqueConstraintError,
} from '@/src/utils/errors/database.error';
import { DomainError } from '@/src/utils/errors/domain.error';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';
    let errorName = 'InternalServerError';

    // ------------------------------------------------------------------
    // 1. MANEJO DE ERRORES DE DOMINIO (Reglas de Negocio)
    // ------------------------------------------------------------------
    if (exception instanceof DomainError) {
      status = HttpStatus.BAD_REQUEST; // 400
      message = exception.message;
      errorName = exception.name;
    }

    // ------------------------------------------------------------------
    // 2. MANEJO DE ERRORES DE APLICACIÓN (Casos de Uso)
    // ------------------------------------------------------------------
    else if (exception instanceof ApplicationError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      errorName = exception.name;
    }

    // ------------------------------------------------------------------
    // 3. MANEJO DE ERRORES DE BASE DE DATOS (Infraestructura)
    // ------------------------------------------------------------------
    else if (exception instanceof DatabaseError) {
      if (exception.isKnownError) {
        if (exception instanceof UniqueConstraintError) {
          status = HttpStatus.CONFLICT; // 409
        } else if (exception instanceof ForeignKeyConstraintError) {
          status = HttpStatus.CONFLICT;
        } else if (exception instanceof InvalidDataError) {
          status = HttpStatus.BAD_REQUEST; // 400
        } else {
          status = HttpStatus.BAD_REQUEST;
        }

        message = exception.message;
        errorName = exception.name;
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Error interno procesando la solicitud en base de datos';
        errorName = 'DatabaseInternalError';

        this.logger.error(
          `DB Error Crítico: ${exception.message}`,
          (exception.originalError as Error)?.stack,
        );
      }
    }

    // ------------------------------------------------------------------
    // 4. MANEJO DE ERRORES NATIVOS DE NESTJS (HttpException)
    // ------------------------------------------------------------------
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      errorName = exception.name;

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const res = exceptionResponse as Record<string, unknown>;
        message = res.message || exception.message;
      } else if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      }
    }

    // ------------------------------------------------------------------
    // 5. ERRORES NO CONTROLADOS (Bugs, NullPointer, etc.)
    // ------------------------------------------------------------------
    else {
      const error = exception as Error;
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Ha ocurrido un error inesperado';

      this.logger.error(`Error No Controlado: ${error.message}`, error.stack);
    }

    // ------------------------------------------------------------------
    // RESPUESTA FINAL
    // ------------------------------------------------------------------
    response.status(status).send({
      statusCode: status,
      error: errorName,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
