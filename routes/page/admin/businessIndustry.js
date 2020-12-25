const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const BusinessIndustriesModel = require('../../../database/models/admin/BusinessIndustriesModel')

const checker = [
    authUser,
    [
        check('bizindustry','Please enter a Business Industry').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    const {bizindustry} = req.body
    let inputExist =  await BusinessIndustriesModel.findOne({name:bizindustry})
    if (inputExist) {
        return res.status(400).json({error:{msg:"Sorry ths Business Industry already exist"}})
    }

    const Industry =  new BusinessIndustriesModel({
        name:bizindustry,
    })
   try {
    await Industry.save();
    return res.status(200).json({success:{msg:'New Businesss Industry added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router