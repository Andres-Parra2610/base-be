export class DatabaseError extends Error {
  code: string;
  metadata: Record<string, unknown>;
  timestamp: Date;
  originalError: Error;
  query: string;
  params: any;

  constructor(originalError: Error, query: string, params: any) {
    super(`Error de base de datos: ${originalError.message}`);
    this.name = 'DatabaseError';
    this.originalError = originalError;
    this.query = query;
    this.params = params;
    this.code = this.mapErrorCode(originalError);
    this.metadata = {
      originalError,
      query,
      params,
    };
    this.timestamp = new Date();
  }
  
  mapErrorCode(error: Error): string {
    switch (error.message) {
      case '23505': return 'UNIQUE_VIOLATION';
      case '23503': return 'FOREIGN_KEY_VIOLATION';
      case '23502': return 'NOT_NULL_VIOLATION';
      default: return 'DATABASE_ERROR';
    }
  }
}