const express = require('express');
const router = express.Router();
const passport = require('passport'); //to set check at router level

// require postcontroller from controller folder
const postController = require('../controllers/posts_controller');

// linking action for controller with the route
router.post('/create', passport.checkAuthentication, postController.create);

// creating the route for the link to delete post
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);

module.exports = router;