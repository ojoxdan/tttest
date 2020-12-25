const mongoose =  require('mongoose')

const BusinessFunctions =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_business_functions', BusinessFunctions)