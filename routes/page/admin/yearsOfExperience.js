const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const YearsOfExperienceModel = require('../../../database/models/admin/YearsOfExperienceModel')

const checker = [
    authUser,
    [
        check('yofexp','Please enter Years Of Experience').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    const {yofexp} = req.body
    let inputExist =  await YearsOfExperienceModel.findOne({name:yofexp})
    if (inputExist) {
        return res.status(400).json({error:{msg:"Sorry ths Years Of Experience already exist"}})
    }

    const expYears =  new YearsOfExperienceModel({
        name:yofexp,
    })
   try {
    await expYears.save();
    return res.status(200).json({success:{msg:'New Years Of Experience  added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router