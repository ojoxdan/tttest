const mongoose =  require('mongoose')

const AmountDistributionModel =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_amount_distribution', AmountDistributionModel)