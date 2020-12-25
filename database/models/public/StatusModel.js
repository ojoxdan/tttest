const mongoose = require("mongoose")
const Status = mongoose.Schema({
    id:{
        tye:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("tkk_status", Status)