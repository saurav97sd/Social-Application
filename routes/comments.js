const express = require('express');
const router = express.Router();
const passport = require('passport');

// getting the controller
const commentController = require('../controllers/comment_controller');

// linking route with conteoller
router.post('/create', passport.checkAuthentication, commentController.create);
// router for the comment destroy controllers
router.get('/destroy/:id', passport.checkAuthentication, commentController.destroy);

// exporting
module.exports = router;