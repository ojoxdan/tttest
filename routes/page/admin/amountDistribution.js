const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const AmountDistributionModel = require('../../../database/models/admin/AmountDistributionModel')

const checker = [
    authUser,
    [
        check('amountdist','Please enter value forAmount Distribution ').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    let {amountdist} = req.body
    amountdist = amountdist.trim().toLowerCase()
    try {
        let inputExist =  await AmountDistributionModel.findOne({name:amountdist})
        if (inputExist) {
            return res.status(400).json({error:{msg:"Sorry this Distribution Amount already exist"}})
        }
        const amtdist =  new AmountDistributionModel({
            name:amountdist,
        })
        await amtdist.save();
    return res.status(200).json({success:{msg:'New Distribution Amount added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})

// Delete job type 

router.post('/del/:amtdist',authUser, async(req, res, next)=>{

    let {amtdist} = req.params
    try {
    let inputExist =  await AmountDistributionModel.findOne({name:amtdist})
    if (!inputExist) {
        console.log(amtdist)
            return res.status(400).json({error:{msg:"Sorry this Distribution Amount does not exist "}})
    }
    let deleted = await AmountDistributionModel.findOneAndDelete({name:amtdist})
    if (deleted) {
            return res.status(200).json({success:{msg:'Distribution Amount deleted successfully '}})
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
        let distAmt =  await AmountDistributionModel.find()
        return res.status(200).json({success:distAmt})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router