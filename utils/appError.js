class AppError extends Error {
  constructor(message, code, error) {
    super(message);

    this.code = code;
    this.status = `${code}`.startsWith('5') ? 'fail' : 'error';
    this.error = error;
  }
}

module.exports = AppError;
