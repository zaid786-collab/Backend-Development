const e = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username : {
        type: String,
        required: true,
        unique: true,
    }, 
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        rquired: true,
    },
    age : {
        type: Number,
    }, 
    role : {
        type: String,
        enum: ['user','artist'],
        default: 'user',
        required: true,
    }
})

const userModel = mongoose.model("user", userSchema);