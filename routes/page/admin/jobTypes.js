const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const JobTypesModel = require('../../../database/models/admin/JobTypesModel')

const checker = [
    authUser,
    [
        check('jobtype','Please enter a Job Type').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    let {jobtype} = req.body
    jobtype = jobtype.trim().toLowerCase()
    try {
        let inputExist =  await JobTypesModel.findOne({name:jobtype})
        if (inputExist) {
            return res.status(400).json({error:{msg:"Sorry this Job Type already exist"}})
        }
        const jType =  new JobTypesModel({
            name:jobtype,
        })
        await jType.save();
    return res.status(200).json({success:{msg:'New Job Type  added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})

// Delete job type 

router.post('/del/:deltype',authUser, async(req, res, next)=>{

    let {deltype} = req.params
    try {
    let inputExist =  await JobTypesModel.findOne({name:deltype})
    if (!inputExist) {
        console.log(deltype)
            return res.status(400).json({error:{msg:"Sorry this Job Type does not exist "}})
    }
    let deleted = await JobTypesModel.findOneAndDelete({name:deltype})
    if (deleted) {
            return res.status(200).json({success:{msg:'Job Type deleted successfully '}})
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
        let types =  await JobTypesModel.find()
        return res.status(200).json({success:types})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router