const express = require("express");

const router = express.Router();

const usersController = require('../controller/users')


router.get('/all', usersController.getUsers)

router.post('/signup', usersController.registerUsers)

router.post('/signin', usersController.loginUsers)


module.exports = router;