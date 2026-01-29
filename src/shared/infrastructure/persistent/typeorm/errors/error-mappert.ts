import {
  DatabaseError,
  ForeignKeyConstraintError,
  InvalidDataError,
  UniqueConstraintError,
} from '@/src/utils/errors/database.error';
import { QueryFailedError } from 'typeorm';
import { PostgresErrorCode } from '../../postgress/postgress-errors';

export class TypeOrmErrorMapper {
  static map(error: unknown): never {
    // Si no es error de TypeORM, lanzamos error genérico de BD
    if (!(error instanceof QueryFailedError)) {
      throw new DatabaseError('Error de base de datos desconocido', false, error);
    }

    const driverError = error.driverError as { code: string; detail: string; table: string };
    const code = driverError.code;

    switch (code) {
      case PostgresErrorCode.UniqueViolation:
        throw new UniqueConstraintError(driverError.detail);

      case PostgresErrorCode.ForeignKeyViolation:
        throw new ForeignKeyConstraintError(driverError.detail);

      case PostgresErrorCode.NotNullViolation:
        throw new InvalidDataError(`El campo no puede ser nulo: ${driverError.table}`);

      case PostgresErrorCode.InvalidTextRepresentation:
        throw new InvalidDataError('Formato de datos inválido (posiblemente UUID mal formado)');

      default:
        console.error(`[TypeOrmErrorMapper] Código SQL no manejado: ${code}`);
        throw new DatabaseError('Error de base de datos no manejado', false, error as any);
    }
  }
}
