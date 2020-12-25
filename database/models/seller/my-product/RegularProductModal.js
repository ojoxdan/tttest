const mongoose = require('mongoose')

const Regular = mongoose.Schema({
    productSellerId:{
        type:String,
        require: true
    },
    productCategory:{
        type:String,
        require: true
    },
    productSubCategory:{
        type:String,
        require: true
    },
    productImages:{
        type:Array,
        require: true
    },
    productVideo:{
        type:String,
        require: true
    },
    productRegion:{
        type:String,
        require: true
    },
    productCountry:{
        type:String,
        require: true
    },
    productTitle:{
        type:String,
        require: true
    },
    productDescription:{
        type:String,
        require: true
    },
    productContactForPrice:{
        type:Boolean,
        default: false,
    },
    productNegotiable:{
        type:Boolean,
        default: false,
    },
    productPrice:{
        type:String,
        require: true
    },
    productAmountDistribution:{
        type:String,
        require: true
    },
    productSellerPhone:{
        type:String,
        require: true
    },
    productSellerName:{
        type:String,
        require: true
    },
    productCreateOn:{
        type:Date,
        default: Date.now
    }
})

module.exports =  mongoose.model('tkk_regular_products', Regular)