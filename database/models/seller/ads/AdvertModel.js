const mongoose = require('mongoose')

const myAdverts = mongoose.Schema({
    user_id:{
        type:String,
        require:true
    },
    area:{
        type:String, 
        required:true
    },
    campaign_type: {
        type:String,
        require:true
    },
    image:{
        type:Array,
        require:true
    },
    link:{
        type:String,
        require:true
    },
    start_date:{
        type:Date,
        require:true
    },
    end_date:{
        type:Date,
        require:true
    },
    status:{
        type:String,
        require:true,
        default:"active"
    },
    views:{
        type:Number,
    },
    impressions:{
        type:Number,
        default:0
    },
    balance:{
        type:Number,
    },
    budget:{
        type:Number,
        require:true
    }

})

module.exports = mongoose.model('tkk_adverts', myAdverts)