const express = require('express')
const router = express.Router()
const authUser = require('../../../auth/authUser')
const ProductCategoryModel = require('../../../../database/models/admin/ProductCategoryModel')


router.get('/', async(req, res)=>{
    try {
        let categories =  await ProductCategoryModel.find()
        return res.status(200).json({success:categories})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router