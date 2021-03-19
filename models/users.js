// require mongoose
const mongoose = require('mongoose');

// require multer
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

// Creating Schema
const userSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    name: {
        type: 'string',
        required: true
    }

    // Now adding timestamp ie, createdat and updated at
}, {
    timestamps: true
});

// telling mongo it's model 
const User = mongoose.model('User', userSchema);

// export
module.exports = User;