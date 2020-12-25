const mongosse = require('mongoose')

const Review =  mongosse.Schema({
    title:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    seller_id:{
        type:String,
        required:true
    },
    post_id:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    stars:{
        type:Number,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    date_created:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongosse.model('tkk_reviews', Review)