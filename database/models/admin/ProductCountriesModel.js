const mongoose =  require('mongoose')

const ProductCountry =  mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tkk_product_countries', ProductCountry)