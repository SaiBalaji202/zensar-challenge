const router = require('express').Router();
const { check } = require('express-validator');

const validateObjectId = require('../../middlewares/validateObjectId');

const userController = require('../../controllers/users');

// @route   GET api/user
// @desc    Get all Users
// @access  Public
router.get('/', userController.getAllUsers);

// @route   GET api/user/:id
// @desc    Get User By Id
// @access  Public
router.get('/:id', validateObjectId, userController.getUserById);

// @route   POST api/user
// @desc    Create New User
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').trim().not().isEmpty(),
    check('image', 'Image is required').not().isEmpty(),
  ],
  userController.addUser
);

// @route   PUT api/user/:id
// @desc    Udate User By Id.  If User Not found, Create New User
// @access  Public
router.put(
  '/:id',
  [
    validateObjectId,
    [
      check('name', 'Name is required').trim().not().isEmpty(),
      check('image', 'Image is required').not().isEmpty(),
    ],
  ],
  userController.updateUser
);

// @route   DELETE api/user/:id
// @desc    Delete User By Id
// @access  Public
router.delete('/:id', validateObjectId, userController.deleteUser);

module.exports = router;
