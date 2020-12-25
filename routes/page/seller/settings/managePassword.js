const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator')
const UsersModel = require('../../../../database/models/public/UsersModel')
const authUser = require('../../../auth/authUser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

let checker = [
    authUser,
    [
        check('oldpwd', 'Please enter your old password').not().isEmpty(),
        check('newpwd', 'Please enter a new  password').not().isEmpty(),
        check('cnewpwd', 'Please confirm your new password').not().isEmpty(),
    ]
]
router.post('/', [...checker], async(req, res)=>{
    let errors =  validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:{msg: errors.array()}})
    }
    let id = req.user.user.id
    let {oldpwd, newpwd, cnewpwd} = req.body
    if (newpwd !== cnewpwd) {
        return res.status(400).json({error:{msg: "Please make sure your new password matches"}})
    }
    if (newpwd === oldpwd) {
        return res.status(400).json({error:{msg: "Please enter a mew password"}})
    }
   try {
        let userData =  await UsersModel.findOne({_id:id}).select('password').select('-_id')
        let confirmOldPassword =  await bcrypt.compare(oldpwd, userData.password);
        if (!confirmOldPassword) {
            return res.status(400).json({error:{msg: "Please enter your old password correctly "}})
        }

        let salt = await bcrypt.genSalt(10)
        let password = await bcrypt.hash(newpwd, salt)
        let userDetail = await UsersModel.findByIdAndUpdate(req.user.user.id, {
            $set:{
                password
            }
        }).select('-password').select('-dateRegistered')
        return res.json({success:{msg:"Password changed successfully "}})
   } catch (error) {
       res.status(500).json({error:{msg:"Server Error"}})
   }
})
module.exports = router 

