export class ApplicationError extends Error {
  statusCode: number;
  metadata: Record<string, unknown>;
  timestamp: Date;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApplicationError';
    this.timestamp = new Date();
  }
}
