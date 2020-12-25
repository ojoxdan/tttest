const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const AdvanceJobListingModel = require('../../../database/models/admin/AdvanceJobListingModel')

const checker = [
    authUser,
    [
        check('advjoblisting','Please enter an Advance Joblisting').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }
    
    let {advjoblisting} = req.body
    advjoblisting = advjoblisting.trim().toLowerCase()
    let inputExist =  await AdvanceJobListingModel.findOne({name:advjoblisting})
    if (inputExist) {
        return res.status(400).json({error:{msg:"Sorry ths Joblisting already exist"}})
    }
    const list =  new AdvanceJobListingModel({
        name:advjoblisting,
    })
   try {
    await list.save();
    return res.status(200).json({success:{msg:'New Advance Joblisting added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})





// Delete joblisting

router.post('/del/:dellist',authUser, async(req, res, next)=>{

    let {dellist} = req.params
    try {
    let inputExist =  await AdvanceJobListingModel.findOne({name:dellist})
    if (!inputExist) {
        console.log(dellist)
            return res.status(400).json({error:{msg:"Sorry this Joblisting does not exist "}})
    }
    let deleted = await AdvanceJobListingModel.findOneAndDelete({name:dellist})
    if (deleted) {
            return res.status(200).json({success:{msg:'Joblisting deleted successfully '}})
        }else{
            return res.status(400).json({success:{msg:'Error something went wrong '}})
    }

   } catch (error) {
       next(error)
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})



// get joblistings 
router.get('/',authUser, async(req, res)=>{
    try {
        let joblists =  await AdvanceJobListingModel.find()
        return res.status(200).json({success:joblists})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router