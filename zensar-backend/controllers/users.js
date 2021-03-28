const { validationResult } = require('express-validator');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

// Get All Users
exports.getAllUsers = catchAsync(async (_, res) => {
  const users = await User.find();
  return res.json(users);
});

// Get User By Id
exports.getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) return res.json(user);
  return res.status(404).send({ msg: 'User with the given ID was not found.' });
});

// Create User
exports.addUser = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user = new User({
    name: req.body.name,
    image: req.body.image,
  });
  user = await user.save();
  return res.json(user);
});

// Update User by Id or Create User
exports.updateUser = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userFields = {
    name: req.body.name,
    image: req.body.image,
  };
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: userFields },
    { new: true, upsert: true }
  );
  return res.json(user);
});

// Delete User By Id
exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: 'User Deleted Successfully' });
});
