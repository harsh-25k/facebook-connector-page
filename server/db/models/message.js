const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    'message':{
        type:String,
        required:true, 
        unique:true
    },
    'to':{
        type:String,
        required:true
    },
    'user':{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"users",
        required:true
    }
   
});

const MessageModel = mongoose.model('messages', messageSchema);

module.exports = MessageModel;