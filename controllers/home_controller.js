// const db = require('../configs/mongoose');
const Post = require('../models/post'); //require post model

module.exports.home = function(req, res){

    // console.log(req.cookies); //Accessing the cookie created in browser
    // res.cookie('user-id', 25); //Updating or chnaging the cokkies value

    // find all the posts
    // Post.find({}, function(err,posts){
    //     if(err){
    //         console.log('Error finding Post');
    //     }
    //     // else
    //     return res.render('home', {
    //         title: "Home | Authentication",
    //         posts: posts
    //     });
    // });

    // to get the user info from another schema need to prepopulate the user of post db
    Post.find({}).populate('user').exec(function(err,posts){
        if(err){
            console.log('Error finding Post');
        }
         // else
        return res.render('home', {
            title: "Home | Authentication",
            posts: posts
        });
    }); 
}