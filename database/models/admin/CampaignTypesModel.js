const mongoose =  require('mongoose')

const CampaignType = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    imageWidth:{
        type:Number,
        require:true
    },
    imageHeight:{
        type:Number,
        require:true
    }
}) 

module.exports = mongoose.model('tkk_campaign_types', CampaignType)