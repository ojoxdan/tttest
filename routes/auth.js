const express = require('express')
const authUser = require('./auth/authUser')
const UsersModel = require('../database/models/public/UsersModel')
const router = express.Router()

router.get('/', [authUser], async(req, res)=>{
    try {
        let user = req.user.user
        // if (user) {
            let u = await UsersModel.findOne({_id:user.id, userType: user.userType}).select('-password')
            // if (u) {
                res.json(u)
            // }
            // res.json({error:{msg:'Bad Authentication'}})
        // }
    } catch (error) {
        res.json({error:"Server Error"})
    }
})


module.exports = router