const mongoose =  require('mongoose')

const AdvanceJobListing =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_advance_joblisting', AdvanceJobListing)