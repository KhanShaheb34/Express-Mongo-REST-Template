'use strict';

const AppError = require('../utils/appError');

// Error response in development
const sendErrorDev = (err, res) => {
  res
    .status(err.statusCode)
    .json({ message: err.message, status: err.status, stack: err.stack, err });
};

// Error response in production
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ message: err.message, status: err.status });
  } else {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Something went wrong!' });
  }
};

// Mongoose error handlers
const handleCastError = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateError = err => {
  const message = `Duplicating ${Object.keys(err.keyPattern)}`;
  return new AppError(message, 400);
};

const handleValidationError = err => {
  const errMessages = Object.values(err.errors).map(el => el.message);

  const message = `Validation failed on ${Object.keys(err.errors).join(
    ', ',
  )}. ${errMessages.join('. ')}`;
  return new AppError(message, 400);
};

// Handling JWT Errors
const handleJWTError = err => new AppError('Invalid token', 401);
const handleTokenExpiredError = err => new AppError('Token expired', 401);

// The global error handling middleware
// Call next(err) from any router to use this
const errorHandler = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name == 'CastError') error = handleCastError(error);
    if (error.code == 11000) error = handleDuplicateError(error);
    if (error._message && error._message.includes('validation failed'))
      error = handleValidationError(error);
    if (error.name == 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name == 'TokenExpiredError')
      error = handleTokenExpiredError(error);

    sendErrorProd(error, res);
  } else {
    sendErrorDev(err, res);
  }
};

module.exports = errorHandler;
