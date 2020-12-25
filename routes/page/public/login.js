const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const router = express.Router();
const {check, validationResult} = require('express-validator')
const UsersModel = require('../../../database/models/public/UsersModel')

router.post('/', [
    check('uemail', 'Please enter a valid email').not().isEmpty().isEmail(),
    check('upwd', 'Please enter your password correctly').not().isEmpty()
], async (req, res)=>{
    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }
    try {
        let user = await UsersModel.findOne({email: req.body.uemail})

        // console.log(req.body, "the request Body")
        if (user) {
            let checkPassword = await bcrypt.compare(req.body.upwd, user.password)
            if (checkPassword) {
                payload = {
                    user:{
                        id: user.id,
                        userType: user.userType
                    }
                }
                jwt.sign(payload, config.get('TKK_USER_SECRET'), {expiresIn:360000}, (err, token)=>{
                    if (err) {
                        return res.status(401).json({msg:'Bad Authentication'})
                    }

                    return res.status(200).json({success:{msg:'Authentication Successful', token}})
                })
            }else{

                return res.status(200).json({error:{msg:'Wrong User Credential'}})
            }
        }else{
            return res.status(200).json({error:{msg:'Wrong User Credential'}})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({error:{msg:'Server Error'}})
    }
})

module.exports =  router