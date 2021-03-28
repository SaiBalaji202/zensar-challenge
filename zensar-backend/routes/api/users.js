const router = require('express').Router();
const { check } = require('express-validator');

const userController = require('../../controllers/users');

// @route   POST api/users
// @desc    Get all Users
// @access  Public
