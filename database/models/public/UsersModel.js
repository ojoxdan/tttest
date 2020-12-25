const mongoose = require('mongoose')
const config = require('config')

const Users = mongoose.Schema({
        firstName: {
            type:String,
            require: true
        },
        lastName: {
            type:String,
            require: true
        },
        phone: {
            type:String,
            require: true
        },
        userType: {
            type:String,
            require: true
        },
        email: {
            type:String,
            require: true
        },
        password: {
            type:String,
            require: true
        },
        businessName: {
            type:String,
            require: true
        },
        businessAddress: {
            type:String,
            require: true
        },
        city: {
            type:String,
            require: true
        },
        state: {
            type:String,
            require: true
        },
        country: {
            type:String,
            require: true
        },
        retrievePassword: {
            type:String,
            require: true
        },
        dateRegistered: {
            type:Date,
            default:Date.now
        },
        socialNetwork:{
            type:Object,
        },
        accountDetail:{
            type:Object,
        },
        accountDetails:{
            type:Object
        },
        accountUsers:{
            type:Array
        },
        receiveTMessages:{
            type:Boolean,
            default:true
        },
        TwoFactorAuth:{
            type:Object,
            default:{
                phone:null,
                email:null
            }
        },
        twoFactorOTP:{
            type:Object,
            default:{
                otp:null,
                verifier:null
            }
        },
        notificationOptions:{
            type:Array,
        },
        phoneOTP:{
            type:Object,
            default:{
                otp:null,
                phone:null
            }
        },
        lastSeen:{
            type:String,
            require:true
        },
        status:{
            type:String,
            require:true
        },
        wallet:{
            type:Number, 
            default:0,
            require:true
        },
        
    })


module.exports =  mongoose.model('tkk_users', Users)