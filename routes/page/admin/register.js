const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const AdminsModel = require('../../../database/models/admin/AdminsModel')

const checker = [
    check('username', "Please enter your Username").not().isEmpty(),
    check('email', "Please enter your Email address").not().isEmpty(),
    check('email', "Please enter a valid Email address").isEmail(),
    check('password', "Please enter your Username").not().isEmpty(),
    check('confirmPassword', "Please enter your Username").not().isEmpty()
]
router.post('/',checker ,async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }
    let  {username,email, password, confirmPassword} = req.body
    if (password !== confirmPassword) {
        return res.status(400).json({error:{msg:"Please make sure your password matches"}})
    }
    try {

        let userExist = await AdminsModel.findOne({email}).select('-password')
        if (userExist) {
            return res.status(400).json({error:{msg:"Sorry this user already has an account as Admin"}})
        }

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt)

        const admin = new AdminsModel({
            username, email, password
        })

        admin.save()
        res.status(200).json({error:{msg:"You have successfully registered as a Tinkoko Admin"}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:{msg:"Server Error"}})
    }

})
module.exports = router