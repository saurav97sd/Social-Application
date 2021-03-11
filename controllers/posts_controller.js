// require Post model
const Post = require('../models/post');
const Comment = require('../models/comment');

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
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
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
            post.remove();

            await Comment.deleteMany({post: req.params.id});

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