const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../../auth/authUser')
const AmountDistributionModel = require('../../../../database/models/admin/AmountDistributionModel')

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