'use strict';

// Imports
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

// Creating the express app
const app = express();

// Middlewars
app.use(helmet());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Testing a route
app.get('/', (req, res) => {
  res.send('Hello');
});

// Register the routers
app.use(router);

// Using the errorHandler middleware
app.use(errorHandler);

// Exporting the app
module.exports = app;
