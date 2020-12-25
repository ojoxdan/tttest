const mongoose =  require('mongoose')

const JobTypes =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_job_types', JobTypes)