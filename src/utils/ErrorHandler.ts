class ErrorHandler extends Error {
  constructor(message: any, statusCode: any) {
    super(message);
    this.message = message;
  }
}

export default ErrorHandler;
