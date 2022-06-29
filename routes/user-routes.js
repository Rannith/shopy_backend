const express = require('express');
const router = express.Router();
const User = require('../model/User')
const userController = require('../controllers/user-controller')

router.get('/', userController.getAllUser);
router.post('/', userController.addUser);

module.exports = router