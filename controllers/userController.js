'use strict';

// Importing the model
const UserModel = require('../models/userModel');

// Function to get all users
const getUser = (req, res, next) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => next('Error getting the users', 400, err));
};

// Function to create a user
const createUser = (req, res, next) => {
  const { name, email } = req.body;
  const newUser = new UserModel({ name, email });
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => next('Error creating the user', 400, err));
};

// Function to get user by id
const getSingleUser = (req, res, next) => {
  UserModel.findById(req.params.id)
    .then((user) => {
      if (user) res.json(user);
      else next('No user found', 404);
    })
    .catch((err) => next('Error getting the users', 400, err));
};

module.exports = { createUser, getUser, getSingleUser };
