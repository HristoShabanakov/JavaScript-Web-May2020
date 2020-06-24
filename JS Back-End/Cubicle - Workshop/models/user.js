const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: [/^[A-Za-z0-9]+$/, 'Username is not valid'],
        minlength: 5

    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});


module.exports = mongoose.model('User', UserSchema);