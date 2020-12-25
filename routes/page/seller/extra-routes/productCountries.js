const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../../auth/authUser')
const ProductCountriesModel = require('../../../../database/models/admin/ProductCountriesModel')
router.get('/', async(req, res)=>{
    try {
        let regions =  await ProductCountriesModel.find()
        return res.status(200).json({success:regions})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router