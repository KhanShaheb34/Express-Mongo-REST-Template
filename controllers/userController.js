'use strict';

// Importing the model
const UserModel = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all users
const getUser = catchAsync(async (req, res, next) => {
  const users = await UserModel.find();
  res.status(200).json({
    status: 'success',
    users,
  });
});

// Function to create a user
const createUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const newUser = new UserModel({ name, email });
  const user = await newUser.save();
  res.status(200).json({
    status: 'success',
    user,
  });
});

// Function to get user by id
const getSingleUser = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) return next(new AppError('Not found!', 404));

  res.status(200).json({
    status: 'success',
    user,
  });
});

module.exports = { createUser, getUser, getSingleUser };
