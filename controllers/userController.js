'use strict';

// Importing the model
const UserModel = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to get all users
const getUser = catchAsync(async (req, res, next) => {
  const users = await UserModel.find();
  res.status(200).json({
    status: 'success',
    data: { users },
  });
});

// Function to sign up a user
const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new UserModel({ name, email, password });
  const user = await newUser.save();

  sendToken(user, 201, res);
});

// Function to login a user
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Provide valid email and password!', 400));
  }

  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) return next(new AppError('Invalid email or password', 401));

  const correct = await bcrypt.compare(password, user.password);
  if (!correct) return next(new AppError('Invalid email or password', 401));

  sendToken(user, 201, res);
});

const logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', '', { expiresIn: 1000 });
  res.status(200).json({ status: 'success' });
});

// Function to get user by id
const getSingleUser = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) return next(new AppError('Not found!', 404));

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

// Signing a token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send token to client
const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV == 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

module.exports = { signUp, getUser, getSingleUser, login, logout };
