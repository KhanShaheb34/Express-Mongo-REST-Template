'use strict';

// Importing functions from the controller
const {
  getUser,
  createUser,
  getSingleUser,
} = require('../controllers/userController');

// Importing the express router
const userRouter = require('express').Router();

// Setting up the routes
userRouter.route('/').get(getUser).post(createUser);
userRouter.route('/:id').get(getSingleUser);

module.exports = userRouter;
