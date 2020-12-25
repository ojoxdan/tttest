const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator')
const UsersModel = require('../../../../database/models/public/UsersModel')
const authUser = require('../../../auth/authUser');

// let checker = [
//     authUser,
//     [
//         check('otp', 'Please enter the OTP that was sent to you').not().isEmpty(),
//     ]
// ]
router.post('/',authUser, async(req, res)=>{
    // let errors =  validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.json({error:{msg: errors.array()}})
    // }
    
    let id = req.user.user.id
    console.log(req.body, ' the id ')
    let email, phone
    let {twofaemail,twofaphone,otp} = req.body
    if (twofaemail && twofaphone) return res.json({success:{msg:"Sorry you can not use two method for verification"}})
    if (!twofaemail && !twofaphone) return res.json({success:{msg:"Please enter a valid Verification Method"}})

    if (twofaemail) {
        if (/(.+)?@(.+)?\.[\S]/.test(twofaemail)) {
            email = twofaemail
        }else{
            return res.json({error:{msg:"Sorry you have entered an invalid email address"}})
        }
    }else if (twofaphone) {
        if (/[\d]/.test(twofaphone)) {
            phone = twofaphone
        }else{
            return res.json({error:{msg:"Sorry you have entered an invalid Phone Number"}})
        }
    }
    
    try {
        // let checkOTP =  await UsersModel.findOne({_id:id}).select('twoFactorOTP')
        // if (!checkOTP) {
        //     return res.status(404).json({error:{msg: 'Sorry User Not Found'}})
        // }
        // if (checkOTP.otp != otp) {
        //     return res.status(404).json({error:{msg: 'Sorry you entered a wrong OTP'}})
        // }
        // if (checkOTP.verifier != email || checkOTP.verifier != phone) {
        //     return res.status(404).json({error:{msg: 'Sorry your verification method value is not correct'}})
        // }
        await UsersModel.findByIdAndUpdate({_id:id}, {
            $set:{
                twoFactorAuth:{
                    phone,
                    email
                }
            }
        }).select('-password').select('-dateRegistered')
        return res.json({success:{msg:"Your Two Factor Authentication has been enabled  "}})
   } catch (error) {
       res.status(500).json({error:{msg:"Server Error"}})
   }
})
module.exports = router 

