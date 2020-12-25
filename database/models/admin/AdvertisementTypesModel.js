const mongoose =  require('mongoose')

const AdsTypes = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type_id:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    sample_image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    width:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    
}) 

module.exports = mongoose.model('tkk_advertisement_types', AdsTypes)