'use strict';

const AppError = require('../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const UserModel = require('../models/userModel');

const protect = catchAsync(async (req, res, next) => {
  let token;
  // Check if there's a token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return next(new AppError('Please log in', 401));

  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if the user available
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return next(
      new AppError('User belongs to this token is not available', 401),
    );
  }

  // Check if the user changed password after the password is changed
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password', 401));
  }

  // Grant access
  req.user = user;
  next();
});

// Restrict perticuler routes
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('No permission', 403));
    }
  };

  next();
};

module.exports = { protect, restrictTo };
