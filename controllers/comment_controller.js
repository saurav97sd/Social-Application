// importing the post and comment model schema
const Comment = require('../models/comment');
const Post = require('../models/post');

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

            // flash message for comments create
            req.flash('success', 'Comment Published successfully !!');
            return res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
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
module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // flash message for deleting commit
            req.flash('success','Comment Deleted :)');
            return res.redirect('back');
        }else{
            req.flash('error','You cant delete the comment !!');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}