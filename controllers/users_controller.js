// Importing the model schema to create json objects in db
const User = require('../models/users');
const db = require('../configs/mongoose');
const fs = require('fs');
const path = require('path');

// Action for profile pager
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('profile', {
            title: 'Profile | Authentication',
            profile_user: user
        });
    });
    
};

// Action for sign up
module.exports.signUp = function(req, res){

    // making signup page only for user that are signed out
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'Sign Up | Authentication'
    });
};

// action for sign in
module.exports.signIn = function(req, res){

    // making signin page only for user that are signed out
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: 'Sign In | Authentication'
    });
};

// get the signup data from the from
module.exports.create = function(req, res){
    //Checking if password matches with the confirm password
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back'); //redirect back if not match
    }

    // Check if email already exist in the db as it has to be unique
    User.findOne({email: req.body.email}, function(err, user){

        // handling error
        if(err){
            console.log('Error while finding the user');
            return;
        }

        // if user not found in db then create a new one
        if(!user){
            // Create user
            User.create(req.body, function(err,user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
                }

                // Redirect to signin page
                return res.redirect('/users/sign-in');
            });
        }
        else{ //If user already exist redirect back to signup page
            return res.redirect('back');
        }
    });
};

// Sign in and create session for the user
module.exports.createSession = function(req, res){
    // add flash message
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
};


// adding the action for signout or destroy session
module.exports.signOut = function(req, res){
    req.logout(); //telling the passport to delete the session cookie, its the function given to the rq by passport.
    // add another flash message
    req.flash('success', 'You have logged out');
    return res.redirect('/');
}

// controller for the updating the 
// making the method async await
module.exports.update = async function(req, res){
    // checking so that other cant chnages
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*****Muter Error:',err);
                }
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    
                    
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
            return res.status(401).send('Unauthorized');
    }
}