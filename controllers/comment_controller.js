// importing the post and comment model schema
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req, res) => {
    // find post if exist then add comment else not 
    Post.findById(req.body.post, (err, post) => {
        // handle errors
        if(err){
            console.log('Error finding post');
            return;
        }

        // if found then create posts
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                // handle errors
                if(err){
                    console.log('Error creating comment');
                    return;
                }

                // if success add the comment to the post/update post
                post.comments.push(comment);
                post.save();
                // return
                res.redirect('/');
            });
        }
    });
};


// controller to delete the comments
module.exports.destroy = function(req, res){
    // find he comments
    Comment.findById(req.params.id, function(err, comment){
        // only the one who wrote can delete the comment
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findById(postId, {$pull : {comments: req.params.id}} ,function(err,post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
};