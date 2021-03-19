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
    },
    // avatar field
    avatar: {
        type: 'string'
    }

    // Now adding timestamp ie, createdat and updated at
}, {
    timestamps: true
});

// configuring multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})

// telling mongo it's model 
const User = mongoose.model('User', userSchema);

// export
module.exports = User;