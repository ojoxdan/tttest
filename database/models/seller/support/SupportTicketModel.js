const mongoose =  require('mongoose')

const Support = mongoose.Schema({
    user_id:{
        type:String,
        require:true
    },
    ticket_number:{
        type:String,
        default:null
    },
    reason:{
        type:String,
        require:true
    },
    comment:{
        type:String,
        require:true
    },
    screenshots:{
        type:Array,
    },

    replies:{
        type:Array,
        require:true,
        default:[]
    },
    status:{
        type:String,
        default:"open"
    },
    date_created:{
        type:Date,
        default:Date.now
    },
    last_modified:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model('tkk_support', Support)