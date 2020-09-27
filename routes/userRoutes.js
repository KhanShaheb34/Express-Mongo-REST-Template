'use strict';

// Importing functions from the controller
const {
  getUser,
  signUp,
  getSingleUser,
  login,
} = require('../controllers/userController');
const protect = require('../middlewares/protect');

// Importing the express router
const userRouter = require('express').Router();

// Setting up the routes
userRouter.route('/').get(protect, getUser).post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/:id').get(getSingleUser);

module.exports = userRouter;
