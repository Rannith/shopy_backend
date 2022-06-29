const express = require('express');
const router = express.Router();
const User = require('../model/user')
const userController = require('../controllers/user-controller').default;

router.get('/', userController.getAllUser);
router.post('/', userController.addUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser)

// module.exports = router
exports.default = router