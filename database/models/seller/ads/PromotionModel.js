const mongoose = require('mongoose')

const Promotion = mongoose.Schema({
    post_id:{
        type:String,
        require:true
    },
    user_id:{
        type:String,
        require:true
    },
    type: {
        type:String,
        require:true
    },
    duration:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    views:{
        type:Number,
    },
    inpressions:{
        type:Number,
    },
    balance:{
        type:Number,
    },
    budget:{
        type:Number,
        require:true
    },
    date_started:{
        type:Date,
        require:true
    },
    date_end:{
        type:Date,
        require:true
    },

})

module.exports = mongoose.model('tkk_promotions', Promotion)