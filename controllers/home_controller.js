// const db = require('../configs/mongoose');
const Post = require('../models/post'); //require post model
const User = require('../models/users');

// adding async await
module.exports.home = async function(req, res){

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
    // Post.find({}).populate('user').exec(function(err,posts){
    //     if(err){
    //         console.log('Error finding Post');
    //     }
    //      // else
    //     return res.render('home', {
    //         title: "Home | Authentication",
    //         posts: posts
    //     });
    // }); 

    // to show post along side the comments
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err,posts){
    //     if(err){
    //         console.log('Error finding Post');
    //     }
    //      // else
    //     //  find users to show in friends list
    //     User.find({}, function(err,users){
    //         return res.render('home', {
    //             title: "Home | Authentication",
    //             posts: posts,
    //             all_users: users
    //         });
    //     });
    // }); 

    // using async await to get rid off call back hell
    try{
        let posts = await Post.find({})
        .sort('-createdAt') //sorting the post 
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        //Remove the exec() call back function for above function
        let users = await User.find({}); //similarly removing its call back

        return res.render('home', {
            title: "Home | Authentication",
            posts: posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }

}