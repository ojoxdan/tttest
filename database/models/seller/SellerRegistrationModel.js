const mongoose = require('mongoose')

let SellerRegistrationModel = mongoose.Schema({
    sellerId:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required:true
    },
    dateOfBirth:{
        type:String,
        required: true
    },
    countryOfResidence:{
        type:String,
        required:true
    },
    identificationImage:{
        type:String,
        required:true
    },
    CACImage:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('tkk_sellers', SellerRegistrationModel)