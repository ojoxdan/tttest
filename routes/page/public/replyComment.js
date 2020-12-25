const express= require('express')
const router = express.Router()
const authUser = require('../../auth/authUser')
const {check, validationResult} = require('express-validator')
const BuyNowProductModel = require('../../../database/models/seller/my-product/BuyNowProductModel')
const PostModel = require('../../../database/models/seller/my-product/PostModel')
const CommentModel = require('../../../database/models/public/CommentModel')
const checker = [
    authUser,
    [
        check('commentid',"Please enter the Post ID").not().isEmpty(),
        check('userfirstname',"Please enter your Tinkoko First Name").not().isEmpty(),
        check('userlastname',"Please enter your Tinkoko First Name").not().isEmpty(),
        check('replytext',"Please enter what you think about this post").not().isEmpty(),
    ]
]
router.post('/', [...checker],async(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }
    const {commentid,userfirstname,userlastname,replytext, postid} = req.body
    const id =  req.user.user.id
    let post =  await PostModel.findOne({_id:postid})
    if (!post) {
        return res.json({error: {msg:"Sorry this post does not exist"}})
    }
    let theComment =  await CommentModel.findOne({_id:commentid})
    if (!theComment) {
        return res.json({error: {msg:"Sorry this comment does not exist"}})
    }

    try {
        let newReply = await CommentModel.findOneAndUpdate({_id:commentid},{
            $push:{
                commentReplies:{
                    userId:id,
                    replyText:replytext,
                    userFirstName:userfirstname,
                    userlastname:userlastname,
                    date:new Date(Date.now()).getDate()
                }
            }
        })
        newReply.save();
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