const express = require('express')
const router = express.Router()
const authUser = require('../../../auth/authUser')
const MinimumQualifications = require('../../../../database/models/admin/MinimumQualifications')

router.get('/',authUser, async(req, res)=>{
    try {
        let minqualification =  await MinimumQualifications.find()
        return res.status(200).json({success:minqualification})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})

module.exports = router