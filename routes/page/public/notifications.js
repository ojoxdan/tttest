const config = require('config')
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const NotificationModel = require('../../../database/models/public/NotificationModel')
const authUser = require('../../auth/authUser')

// let notes = {
//     order: ``,
//     post_review:``,
//     chat:``,
//     comment:``,
//     like:``,
//     funding:``,
//     post_approval:``,
//     support:``,
//     message:``
// }

const checker = [
    authUser,
    check('ntype', "Please provide type of notification you wish to submit").not().isEmpty(),
    check('nmessage', "Please enter message").not().isEmpty(),
    check('nreceiverid', "Please enter message").not().isEmpty(),
]
router.post('/', checker, async(req, res)=>{
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.json({error: error.array()})
    }
    try {
        let newNotice = new NotificationModel({
            type,
            message,
            status,
            senderId,
            receiverId,
        })
        newNotice.save()
    } catch (error) {
        res.json({error:{msg:"Server Error"}})
    }
})

router.get('/',authUser, async(req, res)=>{
    try {
        let id = req.user.user.id
            let notices = await NotificationModel.findOne({receiverId:id,status:"unread"})
            if (!notices) {
                return res.json({error:"Sorry, You don't Notifications "})
            }
            res.json({success:notices})
        } catch (error) {
            res.json({error:"Server Error"})
        }
})
router.get('/update-status/:readid',authUser, async(req, res)=>{
    try {
        let id = req.user.user.id
        console.log(id, "the id ")
            let notices = await NotificationModel.updateOne({_id:req.params.readid},{receiverId:id,status:"read"})
            if (!notices) {
                return res.json({error:{msg:"Sorry, your notification was not updated  "}})
            }
            res.json({success:{msg:"Notification updated to read successfully"}})
        } catch (error) {
            res.json({error:"Server Error"})
        }
})
module.exports =  router