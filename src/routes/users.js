const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validate = require('../middleware/validate');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', validate.validateUser, usersController.createUser);

module.exports = router;
