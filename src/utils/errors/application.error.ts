export class ApplicationError extends Error {
  metadata: Record<string, unknown>;
  timestamp: Date;

  constructor(message: string) {
    super(message);
    this.name = 'ApplicationError';
    this.timestamp = new Date();
  }
}
