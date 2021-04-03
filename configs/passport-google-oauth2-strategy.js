const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "871377899323-jk1m61ahi1dcsqbmjtahrmlenoup0i4q.apps.googleusercontent.com",
        clientSecret: "OMgCRX1JGmJwi5RQjj28SISZ",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done) {
        // find user 
        User.findOne({email: profile.emails[0].value}).exec(function(err, user) {
            if(err){
                console.log('Error in google stategy', err);
                return;
            }

            console.log(profile);

            // if user found, set is as req.users
            if(user){
                return done(null, user);
            }
            else{ //if not found, create the user and set as req.user
                User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    },
                    function(err, user){
                        if(err){
                            console.log('Error in creating user', err);
                            return;
                        }  

                        return done(null, user);
                    }
                );
            }
        });
    }
));