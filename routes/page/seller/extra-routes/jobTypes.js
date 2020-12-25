const express = require('express')
const router = express.Router()
const authUser = require('../../../auth/authUser')
const JobTypesModel = require('../../../../database/models/admin/JobTypesModel')

router.get('/',authUser, async(req, res)=>{
    try {
        let types =  await JobTypesModel.find()
        return res.status(200).json({success:types})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router