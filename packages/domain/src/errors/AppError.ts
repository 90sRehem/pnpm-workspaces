export class AppError {
  constructor(
    public readonly message: string,
    public statusCode = 400,
    public readonly code?: string,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}
