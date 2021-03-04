// require Post model
const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = function(req, res){
    // check if post exist in the db
    Post.findById(req.params.id, function(err,post){
        // if exist
        // Only user who wrote the post can delete it
        if(post.user == req.user.id){
            // .id means converting the object id into string
            post.remove();

            Comment.deleteMany({post : req.params.id}, function(err){
                return res.redirect('back');
            });
        }else{
            // if post not found
            return res.redirect('back');
        }
    });
}
