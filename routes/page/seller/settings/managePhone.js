const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator')
const UsersModel = require('../../../../database/models/public/UsersModel')
const authUser = require('../../../auth/authUser');

let checker = [
    authUser,
    [
        check('otp', 'Enter sent OTP  or request for another, if not received ').not().isEmpty(),
        check('newphone', 'Enter a valid Phone number').not().isEmpty(),
    ]
]
router.post('/', [...checker], async(req, res)=>{
    let errors =  validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:{msg: errors.array()}})
    }
    
    let id = req.user.user.id
    let {newphone,otp} = req.body
    if (!newphone) return res.status(400).json({success:{msg:"Please enter a valid Phone Number"}})
    if (newphone) {
        if (/[\d]/.test(newphone)) {
            phone = newphone
        }else{
            return res.status(400).json({error:{msg:"Sorry you have entered an invalid Phone Number"}})
        }
    }
    
    try {
        let checkOTP =  await UsersModel.findOne({_id:id}).select('phoneOTP')
        if (!checkOTP) {
            return res.status(404).json({error:{msg: 'Sorry User Not Found'}})
        }
        if (checkOTP.otp != otp) {
            return res.status(404).json({error:{msg: 'Sorry you entered a wrong OTP'}})
        }
        if (checkOTP.phone != phone) {
            return res.status(404).json({error:{msg: 'Incorrect phone number'}})
        }
        await UsersModel.findByIdAndUpdate(id, {
            $set:{
                phone:{
                    phone,
                }
            }
        }).select('-password').select('-dateRegistered')
        return res.json({success:{msg:"Your Phone number has been succeffully chnaged  "}})
   } catch (error) {
       res.status(500).json({error:{msg:"Server Error"}})
   }
})
module.exports = router 

