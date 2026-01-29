export class DatabaseError extends Error {
  message: string;
  timestamp: Date;

  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
    this.message = message;
    this.timestamp = new Date();
  }
}
