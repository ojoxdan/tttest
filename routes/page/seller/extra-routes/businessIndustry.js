const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../../auth/authUser')
const BusinessIndustriesModel = require('../../../../database/models/admin/BusinessIndustriesModel')

router.get('/',authUser, async(req, res)=>{
    try {
        let bizindustry =  await BusinessIndustriesModel.find()
        return res.status(200).json({success:bizindustry})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})

module.exports = router