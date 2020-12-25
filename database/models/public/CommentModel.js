const mongosse = require('mongoose')

const Comment =  mongosse.Schema({
    commentUserId:{
        type:String,
        require:true
    },
    commentPostId:{
        type:String,
        require:true
    },
    userFirstName:{
        type:String,
        require:true
    },
    userLastName:{
        type:String,
        require:true
    },
    commentType:{
        type:String,
        require:true
    },
    commentText:{
        type:String,
        require:true
    },
    commentReplies:{
        type:Array,
        require:true
    }, 
    postUserId:{
        type:String,
        require:true
    }, 
    dateCreated:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongosse.model('tkk_comments', Comment)