export class ApplicationError extends Error {
  code: string;
  statusCode: number;
  metadata: Record<string, unknown>;
  timestamp: Date;

  constructor(code: string, message: string, statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = 'ApplicationError';
    this.timestamp = new Date();
  }
}
