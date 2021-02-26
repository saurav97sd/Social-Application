const express = require('express');
const router = express.Router();
const passport = require('passport'); //to set check at router level

// require postcontroller from controller folder
const postController = require('../controllers/posts_controller');

// linking action for controller with the route
router.post('/create', passport.checkAuthentication, postController.create);

module.exports = router;