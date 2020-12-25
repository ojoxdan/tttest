const mongoose =  require('mongoose')

const PromoPlans = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    sample_image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
}) 

module.exports = mongoose.model('tkk_promotion_plans', PromoPlans)