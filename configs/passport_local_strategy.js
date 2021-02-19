// require passport----------------------------------------------------------------1
const passport = require('passport');

// require the passport strategy
const LocalStrategy = require('passport-local').Strategy;

// require the model of db
const User = require('../models/users');

// we need to tell the passport to use local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email' //its to be used to validate the user
    },
    function(email, password,done) {
        // find the user and establish identity
        User.findOne({email: email}, function(err,user) {
            // if error
            if(err){
                console.log('Error finding user');
                return done(err); //reporting to passport
            }

            // if user not found or password doest matches
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
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
            console.log('Error in finding user: ' + err);
            return done(err);
        }
        // else
        return done(user);
    });
});


// exporting
module.exports = passport;