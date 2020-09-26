'use strict';

// Importing packages
const mongoose = require('mongoose');

// Confuguring the environment variables
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

// Database Connection
const db = process.env.MONGO_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to database...');
  })
  .catch((err) => {
    console.error(err);
  });

// Importing the express app
const app = require('./app');

// Starting the server
app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});
