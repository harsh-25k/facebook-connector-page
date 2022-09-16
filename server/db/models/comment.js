const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    'comment':{
        type:String,
        required:true, 
        unique:true
    },
    'postid_commentid':{
        type:String,
        required:true
    },
    'user':{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"users",
        required:true
    }
});

const CommentModel = mongoose.model('comments', commentSchema);

module.exports = CommentModel;