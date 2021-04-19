// importing the post and comment model schema
const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');

const queue = require('../configs/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

const Like = require('../models/likes');

// module.exports.create = (req, res) => {
//     // find post if exist then add comment else not 
//     Post.findById(req.body.post, (err, post) => {
//         // handle errors
//         if(err){
//             console.log('Error finding post');
//             return;
//         }

//         // if found then create posts
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment) {
//                 // handle errors
//                 if(err){
//                     console.log('Error creating comment');
//                     return;
//                 }

//                 // if success add the comment to the post/update post
//                 post.comments.push(comment);
//                 post.save();
//                 // return
//                 res.redirect('/');
//             });
//         }
//     });
// };

//adding async await to comment create 
// module.exports.create = async function(req, res){

//     try{
//         let post = await Post.findById(req.body.post);

//         if (post){
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });

//             post.comments.push(comment);
//             post.save();

//             // flash message for comments create
//             req.flash('success', 'Comment Published successfully !!');
//             return res.redirect('/');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return res.redirect('back');
//     }
    
// }
// Checking for xhr request of ajax method
module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user', 'name email').execPopulate();
            // commentMailer.newComment(comment);
            // using kue worker 
            let job = queue.create('emails', comment).save(function(err){
                if(err) {
                    console.log('error in creating a queue', err);
                    return;
                }

                console.log('Job Enqueued', job.id);
            });

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


// controller to delete the comments
// module.exports.destroy = function(req, res){
//     // find he comments
//     Comment.findById(req.params.id, function(err, comment){
//         // only the one who wrote can delete the comment
//         if(comment.user == req.user.id){
//             let postId = comment.post;
//             comment.remove();
//             Post.findById(postId, {$pull : {comments: req.params.id}} ,function(err,post){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// };

//adding async awiat to deleting comment
// module.exports.destroy = async function(req, res){

//     try{
//         let comment = await Comment.findById(req.params.id);

//         if (comment.user == req.user.id){

//             let postId = comment.post;

//             comment.remove();

//             let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

//             // flash message for deleting commit
//             req.flash('success','Comment Deleted :)');
//             return res.redirect('back');
//         }else{
//             req.flash('error','You cant delete the comment !!');
//             return res.redirect('back');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return res.redirect('back');
//     }
    
// }

module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // change :: delete the likes of the comments
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}