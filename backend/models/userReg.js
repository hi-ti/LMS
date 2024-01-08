const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a valid username'],
        unique: true
    },
    firstname: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your lastname']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please provide an email']
    },
    age: {
        type: Number,
        min: 10,
        max: 99,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        required: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;