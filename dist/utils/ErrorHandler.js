class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
    }
}
export default ErrorHandler;
