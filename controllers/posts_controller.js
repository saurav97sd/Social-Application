// require Post model
const Post = require('../models/post');

module.exports.create = function(req, res){
    // Storing in db
    Post.create({
        content: req.body.content,
        user: req.user._id
        
    }, function(err, post){
        if(err){
            console.log('Error Creating Post');
            return;
        }
        console.log('Post Created');
        return res.redirect('back');
    });
};