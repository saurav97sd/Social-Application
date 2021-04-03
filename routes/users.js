const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

// router to profile of users
// changed /profile to /profile/:id
router.get('/profile/:id', passport.checkAuthentication, userController.profile); //added middleware to restrict unauthorized
// router for the update form-data
router.post('/update/:id', passport.checkAuthentication, userController.update); 

// router to create a new object in db
router.post('/create', userController.create);
// use passport as middleware
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);

// route for the signout action
router.get('/sign-out', userController.signOut);


// route for google sing in/up(social authentication)
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);


module.exports = router;