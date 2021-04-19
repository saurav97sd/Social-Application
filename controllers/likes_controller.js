const Like = require('../models/likes');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){
    try {
        //likes/toogle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == "Post"){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if like exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user_id
        });

        // if like already exist then delete i
        if(existingLike){
            likeable.likes.pull(existingLike.id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            // make one
            let newLike = await Like.create({
                user : req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            })

            likeable.likes.push(newLike.id);
            likeable.save();
        }
        // return res.json(200, {
        //     message: "Request Successful",
        //     data: {
        //         deleted : deleted
        //     }
        // })

        return res.redirect('back');

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}