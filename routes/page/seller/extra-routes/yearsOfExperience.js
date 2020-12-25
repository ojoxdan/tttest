const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../../auth/authUser')
const YearsOfExperienceModel = require('../../../../database/models/admin/YearsOfExperienceModel')


router.get('/',authUser, async(req, res)=>{
    try {
        let yoe =  await YearsOfExperienceModel.find()
        return res.status(200).json({success:yoe})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})

module.exports = router