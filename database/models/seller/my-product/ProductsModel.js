const mongoose = require('mongoose')

const Product = mongoose.Schema({
    productSellerId:{
        type:String,
        require: true
    },
    productType:{
        type:String,
        require:true
    },
    productStars:{
        type:Number,
        default:0
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
    productSellerCompany:{
        type:String,
        require: true
    },
    productDropOffLocation:{
        type:String,
        require: true
    },
    shippingDuration:{
        type:Number,
        require:true
    },
    shippingCost:{
        type:Number,
        require:true
    },
    productCreateOn:{
        type:Date,
        default: Date.now
    }
})

module.exports =  mongoose.model('tkk_products', Product)