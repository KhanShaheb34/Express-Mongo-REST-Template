'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Creating a schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'This is not a valid email'
    },
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
    // select: false
  },
  registered_at: {
    type: Date,
    default: Date.now
  }
});

// Encrypt the password
userSchema.pre('save', async function (next) {
  // To run encryption only if the password is changed
  if (!this.isModified('password')) return next();

  // Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Creating model from a Schema
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
