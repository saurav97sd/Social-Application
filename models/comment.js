const mongoose = require('mongoose'); //require mongoose module

// schema
const commentSchema = new mongoose.Schema({
    // content of comment
    content: {
        type: String,
        required: true
    },

    // Comment belong to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // comment belong to a post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    timestamps: true
});

// naming the schema model
const Comment = mongoose.model('Comment', commentSchema);

// expoting the model
module.exports = Comment;