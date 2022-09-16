const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    'name':{
        type:String,
        required:true, 
        unique:true
    },
    'password':{
        type:String,
        required:true
    },
    'phoneno':
    {
        type:Number,
    },
    'email':{
        type:String
    }
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;