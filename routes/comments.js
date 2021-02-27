const express = require('express');
const router = express.Router();
const passport = require('passport');

// getting the controller
const commentController = require('../controllers/comment_controller');

// linking route with conteoller
router.post('/create', passport.checkAuthentication, commentController.create);

// exporting
module.exports = router;