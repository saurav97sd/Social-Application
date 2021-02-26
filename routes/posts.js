const express = require('express');
const router = express.Router();

// require postcontroller from controller folder
const postController = require('../controllers/posts_controller');

// linking action for controller with the route
router.post('/create', postController.create);

module.exports = router;