const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const BusinessFunctionsModel = require('../../../database/models/admin/BusinessFunctionsModel')

const checker = [
    authUser,
    [
        check('bizfxn','Please enter a Business Function').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    let {bizfxn} = req.body
    bizfxn =  bizfxn.trim().toLowerCase()
    let inputExist =  await BusinessFunctionsModel.findOne({name:bizfxn})
    if (inputExist) {
        return res.status(400).json({error:{msg:"Sorry ths Business Function already exist"}})
    }
    const bizFunction =  new BusinessFunctionsModel({
        name:bizfxn,
    })
   try {
    await bizFunction.save();
    return res.status(200).json({success:{msg:'New Businesss Function added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})


// Delete joblisting

router.post('/del/:delbizfxn',authUser, async(req, res, next)=>{

    let {delbizfxn} = req.params
    try {
    let inputExist =  await BusinessFunctionsModel.findOne({name:delbizfxn})
    if (!inputExist) {
        console.log(delbizfxn)
            return res.status(400).json({error:{msg:"Sorry this Business Function does not exist "}})
    }
    let deleted = await BusinessFunctionsModel.findOneAndDelete({name:delbizfxn})
    if (deleted) {
            return res.status(200).json({success:{msg:'Business Function deleted successfully '}})
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
        let bizfxns =  await BusinessFunctionsModel.find()
        return res.status(200).json({success:bizfxns})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router