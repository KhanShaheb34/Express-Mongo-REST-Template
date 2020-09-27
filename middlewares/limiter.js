'use strict';

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_RESETS_IN * 60 * 1000, // RATE_LIMIT_RESETS_IN minutes
  max: process.env.RATE_LIMIT, // limit each IP to RATE_LIMIT requests per windowMs
  message: 'Reached request limit',
});

module.exports = limiter;
