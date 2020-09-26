'use strict';

// The global error handling middleware
// Call next(err) from any router to use this
const errorHandler = (err, req, res, next) => {
  const { message, status, code, error } = err;
  res.json({ message, status, code, error });
};

module.exports = errorHandler;
