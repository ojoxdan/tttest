const express = require("express")
const router = express.Router()
const PostModel = require("../../../database/models/seller/my-product/PostModel")
const authUser = require("../../auth/authUser")

router.get("/review", authUser,async(req, res)=>{
    try {
        const posts = await PostModel.find({$or:[{post_status:"pending"}, {post_status:"declined"}]})
        res.json({success:posts})
    } catch (err) {
        console.log(err)
        res.json({error:{msg:"Server Error"}})
    }
})
router.post("/approve", authUser,async(req, res)=>{
    console.log("trying to approve now ")
    try {
        let postid = req.body.postid
        const singleUpdate = await PostModel.findOneAndUpdate({_id:postid},{post_status:"active"})

        if (singleUpdate) {
            const posts = await PostModel.find({$or:[{post_status:"pending"}, {post_status:"declined"}]})
            res.json({success:[...posts]})
        }else{
            res.json({error:{msg:"Please make sure you enter a valid Post ID "}})
        }
    } catch (err) {
        console.log(err)
        res.json({error:{msg:"Server Error"}})
    }
})
router.post("/decline", authUser,async(req, res)=>{
    try {
        let postid = req.body.postid
        const singleUpdate = await PostModel.findOneAndUpdate({_id:postid},{post_status:"declined"})
        if (singleUpdate) {
            const posts = await PostModel.find({$or:[{post_status:"pending"}, {post_status:"declined"}]})
            res.json({success:{msg:posts}})
        }else{
            res.json({error:{msg:"Please make sure you enter a valid Post ID "}})
        }
    } catch (err) {
        console.log(err)
        res.json({error:{msg:"Server Error"}})
    }
})
module.exports = router