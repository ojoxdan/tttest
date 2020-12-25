const mongoose =  require('mongoose')

const Notification = mongoose.Schema({
    name:{
        type:String,
        require:true,
    }
}) 

module.exports = mongoose.model('tkk_notifications', Notification)