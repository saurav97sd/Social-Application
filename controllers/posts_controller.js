// require Post model
const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/likes');

// module.exports.create = function(req, res){
//     // Storing in db
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
        
//     }, function(err, post){
//         if(err){
//             console.log('Error Creating Post');
//             return;
//         }
//         console.log('Post Created');
//         return res.redirect('back');
//     });
// };

// adding async wait to post create
module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        // check if ajax request 
        if(req.xhr){

            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();
            
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created successfully"
            });
        }
        
        // flsah message for creating post
        req.flash('success', 'Post Published Successfully!!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}

// module.exports.destroy = function(req, res){
//     // check if post exist in the db
//     Post.findById(req.params.id, function(err,post){
//         // if exist
//         if(err){
//             console.log('Post Not found');
//         }
//         // Only user who wrote the post can delete it
//         if(post.user == req.user.id){
//             // .id means converting the object id into string
//             post.remove();

//             Comment.deleteMany({post : req.params.id}, function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             // if post not found
//             return res.redirect('back');
//         }
//     });
// }

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){

            // changes :: delete the associated likes for the post and all its comments like too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();

            await Comment.deleteMany({post: req.params.id});

            // if ajax dekete
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });
            }

            // flash message for deleting post and comment
            req.flash('success', 'Post and Associated Comment Deleted !!');
            return res.redirect('back');
        }else{
            req.flash('error', 'You cant delete this post ;)');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}