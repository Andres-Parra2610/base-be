export class DomainError extends Error {
  metadata: Record<string, unknown>;
  timestamp: Date;

  constructor(message: string, metadata = {}) {
    super(message);
    this.metadata = metadata;
    this.name = 'DomainError';
    this.timestamp = new Date();
  }
}
