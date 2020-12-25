const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const MinimumQualifications = require('../../../database/models/admin/MinimumQualifications')

const checker = [
    authUser,
    [
        check('minqualification','Please enter a Job Type').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    const {minqualification} = req.body
    let inputExist =  await MinimumQualifications.findOne({name:minqualification})
    if (inputExist) {
        return res.status(400).json({error:{msg:"Sorry this Minimum Qualification already exist"}})
    }

    const minimumLevel =  new MinimumQualifications({
        name:minqualification,
    })
   try {
    await minimumLevel.save();
    return res.status(200).json({success:{msg:'New Minimum Qualification added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router