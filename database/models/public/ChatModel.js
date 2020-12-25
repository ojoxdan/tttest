const mongoose = require("mongoose")
const Chats = mongoose.Schema({
    product_id:{
        type:String, 
        require :true
    },
    chat_id:{
        type:String,
        require: true
    },
    receiver_user_type:{
        type:String,
        require: true
    },
    sender_user_type:{
        type:String,
        require: true
    },
    receiver_name:{
        type:String,
        require: true
    },
    sender_name:{
        type:String,
        require: true
    },
    sender:{
        type:String,
        default:null
    },
    receiver:{
        type:String,
        default:null
    },
    product_url:{
        type:String, 
        require :true
    },
    product_category:{
        type:String, 
        require :true
    },
    product_title:{
        type:String, 
        require :true
    },
    product_type:{
        type:String, 
        require :true
    },
    conversations:{
        type:Array,
        require:true
    },
    chat_date:{
        type:Date,
        default: Date.now()
    },
    user_status:{
        type:String,
        require:true,
        default:"offline"
    },
    last_message:{
        type:Object,
        require:true
    },
    message_status:{
        type:String,
        require:true
    },
    chat_status:{
        type:String,
        require:true,
        default:"active"
    }
})

module.exports = mongoose.model("tkk_chats", Chats)