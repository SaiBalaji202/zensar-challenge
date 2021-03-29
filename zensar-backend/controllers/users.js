const { unlink } = require('fs/promises');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const multer = require('multer');
const sharp = require('sharp');
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
  if (!req.file) {
    return res.status(400).json({ msg: 'Invalid Image Data' });
  }

  const imagePath = `${req.protocol}://${req.get('host')}/images/${
    req.file.filename
  }`;
  let user = new User({
    name: req.body.name,
    image: imagePath,
  });
  user = await user.save();
  return res.status(201).json(user);
});

// Update User by Id
exports.updateUser = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!req.file) {
    return res.status(400).json({ msg: 'Invalid Image Data' });
  }

  let user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(404)
      .send({ msg: 'User with the given ID was not found.' });
  }
  const fileName = path.basename(user.image);
  const filePath = path.join('images', 'users', fileName);
  if (fs.existsSync(filePath)) await unlink(filePath);

  const imagePath = `${req.protocol}://${req.get('host')}/images/${
    req.file.filename
  }`;
  const userFields = {
    name: req.body.name,
    image: imagePath,
  };
  user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: userFields },
    { new: true }
  );
  return res.json(user);
});

// Delete User By Id
exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(404)
      .send({ msg: 'User with the given ID was not found.' });
  }
  const fileName = path.basename(user.image);
  const filePath = path.join('images', 'users', fileName);

  await User.findByIdAndDelete(req.params.id);
  if (fs.existsSync(filePath)) await unlink(filePath);
  return res.json({ msg: 'User Deleted Successfully' });
});

// // MULTER - Disk Storage
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `${req.body.name}-${Date.now()}.${ext}`);
//   },
// });

// MULTER
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserImage = upload.single('image');

// Sharp - For Image Resize
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return;
  }

  req.file.filename = `${req.body.name}-${Date.now()}.jpeg`;
  console.log(req.body);
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`images/users/${req.file.filename}`);
  next();
});
