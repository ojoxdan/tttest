const mongosse = require('mongoose')

const Application =  mongosse.Schema({
    jobId:{
        type:String,
        require:true
    },
    sellerId:{
        type:String,
        require:true
    },
    buyerId:{
        type:String,
        require:true
    },
    applicantFullName:{
        type:String,
        require:true
    },
    applicantEmail:{
        type:String,
        require:true
    },
    applicantDOB:{
        type:String,
        require:true
    },
    applicantLocation:{
        type:String,
        require:true
    },
    applicantYearsOfExperience:{
        type:String,
        require:true
    },
    applicantCurrentSalary:{
        type:String,
        require:true
    },
    
    applicantHighestLevelEducation:{
        type:String,
        require:true
    },
    applicantCurrentBusinessFunction:{
        type:String,
        require:true
    },
    applicantAttachedCV:{
        type:String,
        require:true
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongosse.model('tkk_job_applications', Application)