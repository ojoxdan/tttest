const express= require('express')
const router = express.Router()
const authUser = require('../../auth/authUser')
const ioSocket = require('../../../server')
const {check, validationResult} = require('express-validator')
const PostModel = require('../../../database/models/seller/my-product/PostModel')
const CommentModel = require('../../../database/models/public/CommentModel')
const NotificationModel = require('../../../database/models/public/NotificationModel')
const checker = [
    authUser,
    [
        check('postid',"Please enter the Post ID").not().isEmpty(),
        check('userfirstname',"Please enter your Tinkoko First Name").not().isEmpty(),
        check('userlastname',"Please enter your Tinkoko First Name").not().isEmpty(),
        check('comment',"Please enter what you think about this post").not().isEmpty(),
        check('postuserid',"Please enter the post User ID").not().isEmpty()
    ]
]
router.post('/', [...checker],async(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }
    const {postid,userfirstname,userlastname,comment,postuserid} = req.body
    const id =  req.user.user.id
    let post =  await PostModel.findOne({_id:postid})
    if (!post) {
        return res.json({error: {msg:"Sorry this post does not exist"}})
    }

    try {
        let newcomment = new CommentModel({
            commentUserId:id,
            commentPostId:postid,
            userFirstName:userfirstname,
            userLastName:userlastname,
            commentText:comment,
            postUserId:postuserid
        })
        newcomment.save();
        let sid = post.post_author;
    // insert notification and send notification via socket too
    // Notification - Starts
    let sender = {
        userType: req.user.user.userType,
        id,
        message: `Your post "${postid}" got a new comment`,
      };
      let receiver = {
        userType: "seller",
        id: sid,
        message: `Your comment on  "${postid}" has been posted `,
      };
  
      let toReceiver = new NotificationModel({
        type: "comment",
        reciever: sid,
        status: "new",
        message: `Your post "${postid}" got a new comment`,
        sender: id,
      });
      toReceiver.save();
      let toSender = new NotificationModel({
        type: "comment",
        reciever: id,
        status: "new",
        message: `Your comment on "${postid}" has been posted`,
        sender: sid,
      });
      toSender.save();
      if (sender && receiver) {
        ioSocket.notifyUser(sender, receiver);
        ioSocket.notifyUser(receiver, sender);
      }
      // Notifiction - End
        let postComments = await CommentModel.find({commentPostId:postid})
        res.json({success:{postComments}})
    } catch (error) {
        res.status(500).json({error:{msg:'Server error'}})
        process.exit()
    }
})

router.get('/:postid', async (req, res)=>{
    try {
        const postComments = await CommentModel.find({commentPostId: req.params.postid})
        if (!postComments) {
            return res.json({error: {msg:"No comment for this post yet, be the first to tell us what you think about this post"}})
        }
        return res.json({success: postComments})
    } catch (error) {
        console.error(error.message)
        return res.json({error:{msg:"Server Error try again "}})
    }
})
module.exports = router