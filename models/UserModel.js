'use strict';

'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

// Creating a schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'This is not a valid email',
    },
  },
  registered_at: {
    type: Date,
    default: Date.now,
  },
});

// Creating model from a Schema
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
