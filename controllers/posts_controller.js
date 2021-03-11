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
    
        return res.redirect('back');

    }catch(err){
        console.log('Error', err);
        return;
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
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error', err);
        return;
    }
    
}