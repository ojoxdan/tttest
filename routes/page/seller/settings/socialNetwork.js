const express = require('express');
const router = express.Router();
const UsersModel = require('../../../../database/models/public/UsersModel')
const authUser = require('../../../auth/authUser');

router.post('/', authUser, async(req, res)=>{
    if (!req.body) {
        return res.json({error:{msg: "Invalid Parameter"}})
    }
    let userdata = req.user.user
    let {facebook, twitter, instagram, linkedin} = req.body
    let user = await UsersModel.findOne({_id:userdata.id})

    if (!user) return res.status(404).json({error:{msg: 'User Not Found'}})
    let userDetail = await UsersModel.findByIdAndUpdate({_id:userdata.id}, {
        $set:{
            socialNetwork:{facebook, twitter, instagram, linkedin}
        }
        
    }).select('-password').select('-dateRegistered')

    return res.json({success:{msg:userDetail}})
})


router.get('/', authUser, async(req, res)=>{
    let userdata = req.user.user
    let user = await UsersModel.findOne({_id:userdata.id})
    
    if (!user) return res.status(404).json({error:{msg: 'User Not Found'}})
    let userDetail = await UsersModel.findOne({_id:userdata.id}).select('socialNetwork')

    return res.json({success:{msg:userDetail}})

})
module.exports = router 

