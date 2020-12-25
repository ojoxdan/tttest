const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const NotificationModel = require('../../../database/models/admin/NotificationModel__')

const checker = [
    authUser,
    [
        check('notification','Please don\'t leave the Notification field empty').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    const {notification} = req.body
    let inputExist =  await NotificationModel.findOne({name:notification})
    if (inputExist) {
        return res.status(400).json({error:{msg:"Sorry this Notification option already exist"}})
    }
    const notice =  new NotificationModel({
        name:notification,
    })
   try {
    await notice.save();
    return res.status(200).json({success:{msg:'New Notification Option added successfully'}})
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({error:{msg:"Server Error"}})
   }

})
module.exports = router