// Setting first route ---------------------------------------------

const express = require('express');
// setting router
const router = express.Router();

//Importing the controller for home page
const homeController = require('../controllers/home_controller');
// Setting the controller for that route
router.get('/', homeController.home);

// for other route
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));

// making sure rotes know about the api folder
router.use('/api', require('./api'));

module.exports = router;

