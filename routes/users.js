const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

// router to profile of users
router.get('/profile', userController.profile);
// router to create a new object in db
router.post('/create', userController.create);

module.exports = router;