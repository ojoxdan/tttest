const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator')
const UsersModel = require('../../../../database/models/public/UsersModel')
const authUser = require('../../../auth/authUser');

let checker = [
    authUser,
    check('fname', 'Please enter your First Name').not().isEmpty(),
    check('lname', 'Please enter your Last Name').not().isEmpty(),
    check('bname', 'Please enter your Business Name').not().isEmpty(),
    check('baddress', 'Please enter your Business Address').not().isEmpty(),
    check('city', 'Please select a City ').not().isEmpty(),
    check('state', 'Please select a State ').not().isEmpty(),
    check('country', 'Please select a Country ').not().isEmpty()
]
router.post('/', [...checker], async(req, res)=>{
    let errors =  validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:{msg: errors.array()}})
    }
    let id = req.user.user.id
    let user = await UsersModel.findOne({_id:id})
    if (!user) return res.status(404).json({error:{msg: 'User Not Found'}})
    let userDetail = await UsersModel.findByIdAndUpdate(req.user.user.id, {
        $set:{
            firstName:req.body.fname,
            lastName:req.body.lname,
            businessAddress:req.body.bname,
            city:req.body.city,
            state:req.body.state,
            country:req.body.country
        }
    }).select('-password').select('-dateRegistered')

    return res.json({success:{msg:userDetail}})
})
module.exports = router 

