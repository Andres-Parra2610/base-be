export class DatabaseError extends Error {
  public readonly isKnownError: boolean;
  public readonly originalError?: unknown;

  constructor(message: string, isKnownError: boolean = true, originalError?: unknown) {
    super(message);
    this.name = 'DatabaseError';
    this.isKnownError = isKnownError;
    this.originalError = originalError;
  }
}

// 1. Violación de Unicidad (Ej: Email duplicado) -> Suele ser 409 Conflict
export class UniqueConstraintError extends DatabaseError {
  constructor(detail: string = 'Registro duplicado') {
    super(`Violación de restricción única: ${detail}`, true);
    this.name = 'UniqueConstraintError';
  }
}

// 2. Llave Foránea (Ej: ID de granja no existe) -> Suele ser 409 o 400
export class ForeignKeyConstraintError extends DatabaseError {
  constructor(detail: string = 'Referencia a entidad no existente') {
    super(`Violación de llave foránea: ${detail}`, true); // true = Conocido
    this.name = 'ForeignKeyConstraintError';
  }
}

// 3. Datos Inválidos (Ej: UUID mal formado, Null en columna Not Null) -> 400 Bad Request
export class InvalidDataError extends DatabaseError {
  constructor(message: string) {
    super(message, true); // true = Conocido
    this.name = 'InvalidDataError';
  }
}

// 4. Error Desconocido (Ej: DB Down, Deadlock, Timeout) -> 500 Internal Server Error
// Esta clase la instanciamos cuando el Mapper no sabe qué pasó
export class UnknownDatabaseError extends DatabaseError {
  constructor(originalError: unknown) {
    super('Error de base de datos desconocido e inesperado', false, originalError);
    this.name = 'UnknownDatabaseError';
  }
}
