const mongoose = require("mongoose")
const Reference = mongoose.Schema({
    data_model:{
        type:String,
        required:true
    },
    reference:{
        type:String,
        required:true,
    },
    user:{
        type:String,
        // required:true,
    }
})

module.exports = mongoose.model("tkk_model_referral", Reference)