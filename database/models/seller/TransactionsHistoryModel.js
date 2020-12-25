const mongoose = require("mongoose")

const TxnHistory = mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    date:{
        type:Date, 
        default:Date.now()
    },
    description:{
        type:String,
        required:true
    },
    transaction_type:{
        type:String,
        required:true
    },
    status:{
        type:String, 
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("tkk_transactions_histories", TxnHistory)