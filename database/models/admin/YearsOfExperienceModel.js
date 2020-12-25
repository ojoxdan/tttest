const mongoose =  require('mongoose')

const YearsOfExperience =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_years_of_experience', YearsOfExperience)