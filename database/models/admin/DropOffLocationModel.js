const mongoose =  require('mongoose')

const DropOffLocation =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_drop_off_locations', DropOffLocation)