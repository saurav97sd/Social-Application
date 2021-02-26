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
    }
},{
    timestamps: true
});


// naming the model
const Post = mongoose.model('Post', postSchema);
// exporting
module.exports = Post;