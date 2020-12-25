const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const AdminsModel = require('../../../database/models/admin/AdminsModel')

const checker = [
    check('email', "Please enter your email").not().isEmpty(),
    check('email', "Please make sure your Email is valid").isEmail(),
    check('password', "Please enter your Password").not().isEmpty()
]
router.post('/',checker ,async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }
    let  {email, password} = req.body

    try {
        
        let user = await AdminsModel.findOne({email})
        if (!user) {
            return res.status(400).json({error:{msg:"Sorry, invalid credentials"}})
        }
        let validpwd = await bcrypt.compare(password, user.password)
        if (validpwd) {
            let payload = {
                id:user._id,
                username:user.username,
                email
            }
            jwt.sign(payload, config.get('TKK_ADMIN_SECRET'), {expiresIn:360000}, (err, token)=>{
                if (err) {
                    return res.status(400).json({error:{msg:"Invalid Authentication"}})
                }
                return res.json({success:{token}})
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:{msg:"Server Error"}})
    }

})
module.exports = router