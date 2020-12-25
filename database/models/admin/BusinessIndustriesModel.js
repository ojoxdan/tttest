const mongoose =  require('mongoose')

const BusinessIndusties =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_business_industries', BusinessIndusties)