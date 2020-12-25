const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator')
const UsersModel = require('../../../../database/models/public/UsersModel')
const authUser = require('../../../auth/authUser');

router.post('/', authUser, async(req, res)=>{
    let errors =  validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:{msg: errors.array()}})
    }
    let id = req.user.user.id
    let {acctname, bankname, acctnumber} = req.body
    try {
        let user = await UsersModel.findOne({_id:id})
        if (!user) return res.status(404).json({error:{msg: 'User Not Found'}})
        let userDetail = await UsersModel.findByIdAndUpdate(req.user.user.id, {
            $set:{
                accountDetails:{
                    accountName:acctname, 
                    bankName:bankname,
                    accountNumber:acctnumber}
                }
                
            }).select('-password').select('-dateRegistered')
            
            return res.json({success:{msg: userDetail}})
        } catch (error) {
            console.error(error.message)
            return res.status(500).json({error:{msg:"Server Error"}})
        }
    })
    module.exports = router 
    
    