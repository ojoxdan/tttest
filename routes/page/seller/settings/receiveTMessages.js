const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator')
const UsersModel = require('../../../../database/models/public/UsersModel')
const authUser = require('../../../auth/authUser');

let checker = [
    authUser,
    [
        check('tmsg', 'Invalid Selection').not().isEmpty(),
    ]
]
router.post('/', [...checker], async(req, res)=>{
    let errors =  validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:{msg: errors.array()}})
    }
    let id = req.user.user.id
    let {tmsg} = req.body
    await UsersModel.findByIdAndUpdate(id, {
        $set:{
            receiveTMessages:Boolean(tmsg)
        }
    }).select('-password').select('-dateRegistered')

   try {
        return res.json({success:{msg:"Your messaging option updated successfully "}})
   } catch (error) {
       res.status(500).json({error:{msg:"Server Error"}})
   }
})
module.exports = router 

