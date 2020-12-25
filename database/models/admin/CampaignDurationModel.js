const mongoose =  require('mongoose')

const CampaignDuration = mongoose.Schema({
    days:{
        type:Number,
        require:true
    }
}) 

module.exports = mongoose.model('tkk_campaign_duration', CampaignDuration)