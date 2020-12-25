const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const ProductRegionsModel = require('../../../database/models/admin/ProductRegionsModel')

const checker = [
    authUser,
    [
        check('productregion','Please enter a new Product Region').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    let {productregion} = req.body
    productregion = productregion.trim().toLowerCase()
    try {
        let inputExist =  await ProductRegionsModel.findOne({name:productregion})
        if (inputExist) {
            return res.status(400).json({error:{msg:"Sorry this Product Region already exist"}})
        }
        const pRegion =  new ProductRegionsModel({
            name:productregion,
        })
        await pRegion.save();
    return res.status(200).json({success:{msg:'New Product Region added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})

// Delete job type 

router.post('/del/:delregion',authUser, async(req, res, next)=>{

    let {delregion} = req.params
    try {
    let inputExist =  await ProductRegionsModel.findOne({name:delregion})
    if (!inputExist) {
        console.log(delregion)
            return res.status(400).json({error:{msg:"Sorry this Product Region does not exist "}})
    }
    let deleted = await ProductRegionsModel.findOneAndDelete({name:delregion})
    if (deleted) {
            return res.status(200).json({success:{msg:'Product Region deleted successfully '}})
        }else{
            return res.status($00).json({success:{msg:'Error something went wrong '}})
    }

   } catch (error) {
       next(error)
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})


router.get('/',authUser, async(req, res)=>{
    try {
        let regions =  await ProductRegionsModel.find()
        return res.status(200).json({success:regions})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router