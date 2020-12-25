const mongoose =  require('mongoose')

const MinimumQualifications =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_minimum_qualifications', MinimumQualifications)