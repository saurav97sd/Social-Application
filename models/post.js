const mongoose = require('mongoose'); //importing mongoose module

// creating schema
const postSchema = new mongoose.Schema({
    content: {
        type: 'string',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // adding this after creating the comment Schema
    // include the array of all the comments in the post schema itself, to acces the comments faster
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

},{
    timestamps: true
});


// naming the model
const Post = mongoose.model('Post', postSchema);
// exporting
module.exports = Post;