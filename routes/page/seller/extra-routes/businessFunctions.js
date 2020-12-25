const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../../auth/authUser')
const BusinessFunctionsModel = require('../../../../database/models/admin/BusinessFunctionsModel')

router.get('/',authUser, async(req, res)=>{
    try {
        let bizfunc =  await BusinessFunctionsModel.find()
        return res.status(200).json({success:bizfunc})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})

module.exports = router