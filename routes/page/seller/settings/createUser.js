const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator')
const UsersModel = require('../../../../database/models/public/UsersModel')
const authUser = require('../../../auth/authUser');

let checker = [
    authUser,
    [
        check('useremail', 'Please enter new user email address').not().isEmpty(),
        check('userfullname', 'Please enter new user Full Name ').not().isEmpty(),
        check('assigntask', 'Please select User Task ').not().isEmpty()
    ]
]
router.post('/', [...checker], async(req, res)=>{
    let errors =  validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:{msg: errors.array()}})
    }
    let id = req.user.user.id
    try {
        let user = await UsersModel.findOne({_id:id})
        if (!user) return res.status(404).json({error:{msg: 'User Not Found'}})
        
        let {useremail, userfullname, assigntask} = req.body 
        let newUser = await UsersModel.findOne({email:useremail})
        if (!newUser) {
            return res.status(400).json({error:{msg: 'No user with this email'}})
        }
        let currentAccountUsers = user.accountUsers
        let checkUser = currentAccountUsers.some(data => data.userEmail === useremail)
        if (checkUser) {
            return res.status(400).json({error:{msg: 'Sorry this user already exist'}})
        }
        await currentAccountUsers.push({
            userId:newUser._id,
            userEmail: useremail,
            userFullName:userfullname,
            userTask:assigntask,
            status:"active"
        })
        let userDetail = await UsersModel.findByIdAndUpdate(req.user.user.id, {
            $set:{
                accountUsers:currentAccountUsers
            }
        }).select('-password').select('-dateRegistered')
        
        return res.json({success:{msg:userDetail}})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:{msg: 'Server Error'}})
    }
})
module.exports = router 

