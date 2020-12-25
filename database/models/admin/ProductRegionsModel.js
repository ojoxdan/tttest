const mongoose =  require('mongoose')

const ProductRegion =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_product_regions', ProductRegion)