const mongoose =  require('mongoose')

const ProductType =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_product_types', ProductType)