const mongoose =  require('mongoose')

const ProductCategory =  mongoose.Schema({
    name:{
        type:Object,
        require:true
    },
    subCategories:{
        type:Array
    }
})

module.exports = mongoose.model('tkk_product_categories', ProductCategory)