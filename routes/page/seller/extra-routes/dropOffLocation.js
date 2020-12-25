const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../../auth/authUser')
const DropOffLocationModel = require('../../../../database/models/admin/DropOffLocationModel')

const checker = [
    authUser,
    [
        check('droplocation','Please enter a drop off location').not().isEmpty(),
    ]
]
router.get('/', async(req, res)=>{
    try {
        let types =  await DropOffLocationModel.find()
        return res.status(200).json({success:types})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router