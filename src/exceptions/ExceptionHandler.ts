export class ExceptionHandler extends Error {
  details: string;
  statusCode: number;

  constructor(message: string, details: string, statusCode: number) {
    super(message);
    this.details = details;
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}
