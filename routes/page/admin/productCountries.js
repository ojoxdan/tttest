const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const ProductCountriesModel = require('../../../database/models/admin/ProductCountriesModel')

const checker = [
    authUser,
    [
        check('productCountry','Please enter a new Product Country ').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    let {productCountry} = req.body
    productCountry = productCountry.trim().toLowerCase()
    try {
        let inputExist =  await ProductCountriesModel.findOne({name:productCountry})
        if (inputExist) {
            return res.status(400).json({error:{msg:"Sorry this Product Country already exist"}})
        }
        const jRegion =  new ProductCountriesModel({
            name:productCountry,
        })
        await jRegion.save();
    return res.status(200).json({success:{msg:'New Product Country added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})

// Delete job type 

router.post('/del/:delcountry',authUser, async(req, res, next)=>{

    let {delcountry} = req.params
    try {
    let inputExist =  await ProductCountriesModel.findOne({name:delcountry})
    if (!inputExist) {
        console.log(delcountry)
            return res.status(400).json({error:{msg:"Sorry this Product Country does not exist "}})
    }
    let deleted = await ProductCountriesModel.findOneAndDelete({name:delcountry})
    if (deleted) {
            return res.status(200).json({success:{msg:'Product Country deleted successfully '}})
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
        let Country =  await ProductCountriesModel.find()
        return res.status(200).json({success:Country})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router