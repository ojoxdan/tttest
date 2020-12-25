const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const ProductTypeModel = require('../../../database/models/admin/ProductTypeModel')

const checker = [
    authUser,
    [
        check('ptype','Please enter a Product Type').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    const {ptype} = req.body
    try {
        let inputExist =  await ProductTypeModel.findOne({name:ptype})
        if (inputExist) {
            return res.status(400).json({error:{msg:"Sorry this Product Type already exist"}})
        }
        const productType =  new ProductTypeModel({
            name:ptype.trim(),
        })
        await productType.save();
    return res.status(200).json({success:{msg:'New Product Type  added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
router.get('/',async(req, res)=>{
    try {
        let types =  await ProductTypeModel.find()
        return res.status(200).json({success:types})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router