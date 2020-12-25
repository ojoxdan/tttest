const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const DropOffLocationModel = require('../../../database/models/admin/DropOffLocationModel')

const checker = [
    authUser,
    [
        check('droplocation','Please enter a drop off location').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    let {droplocation} = req.body
    droplocation = droplocation.trim().toLowerCase()
    try {
        let inputExist =  await DropOffLocationModel.findOne({name:droplocation})
        if (inputExist) {
            return res.status(400).json({error:{msg:"Sorry this Drop off location already exist"}})
        }
        const dLocation =  new DropOffLocationModel({
            name:droplocation,
        })
        await dLocation.save();
    return res.status(200).json({success:{msg:'New Drop off location  added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})

// Delete job type 

router.post('/del/:dellocation',authUser, async(req, res, next)=>{

    let {dellocation} = req.params
    try {
    let inputExist =  await DropOffLocationModel.findOne({name:dellocation})
    if (!inputExist) {
        console.log(dellocation)
            return res.status(400).json({error:{msg:"Sorry this Location does not exist "}})
    }
    let deleted = await DropOffLocationModel.findOneAndDelete({name:dellocation})
    if (deleted) {
            return res.status(200).json({success:{msg:'Drop off location deleted successfully '}})
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
        let types =  await DropOffLocationModel.find()
        return res.status(200).json({success:types})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router