// require passport----------------------------------------------------------------1
const passport = require('passport');

// require the passport strategy
const LocalStrategy = require('passport-local').Strategy;

// require the model of db
const User = require('../models/users');

// we need to tell the passport to use local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email', //its to be used to validate the user
    passReqToCallback: true //add req to below function
    },
    function(req, email, password, done) {
        // find the user and establish identity
        User.findOne({email: email}, function(err,user) {
            // if error
            if(err){
                req.flash('error', err); //add error flash mesage
                return done(err); //reporting to passport
            }

            // if user not found or password doest matches
            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password !!'); //add error flash mes
                return done(null, false);
            }

            // if user found
            return done(null, user);
        });
    }
));


// Serializing and Deserializing-------------------------------------------------------------------2
// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user');
            return done(err);
        }
        // else
        return done(null, user);
    });
});

// check if the user is authenticated for giving access to profile page  (middleware)
passport.checkAuthentication = function(req, res, next){
    // if user is signed in then pass the req to the next function ,ie controllers action 
    if(req.isAuthenticated()){
        return next();
    }

    // else return to signin page
    return res.redirect('/users/sign-in');
};

// set user of view (middleware)
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from session cookie and we are just sending that
        // to the locals fpr the view
        res.locals.user = req.user;
    }
    next();
};

// exporting
module.exports = passport;