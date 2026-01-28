export class DomainError extends Error {
  code: string;
  metadata: Record<string, unknown>;
  timestamp: Date;

  constructor(code: string, message: string, metadata = {}) {
    super(message);
    this.code = code;
    this.metadata = metadata;
    this.name = 'DomainError';
    this.timestamp = new Date();
  }
}
