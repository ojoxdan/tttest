const express = require("express");
const router = express.Router();
const ioSocket = require("../../../server");
const authUser = require("../../auth/authUser");
const { check, validationResult } = require("express-validator");
const PostModel = require("../../../database/models/seller/my-product/PostModel");
const CommentModel = require("../../../database/models/public/CommentModel");
const NotificationModel = require("../../../database/models/public/NotificationModel");

const checker = [
  authUser,
  check("postid", "Please you have to like the post first").not().isEmpty(),
];
router.post("/", authUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { postid, like } = req.body;
  const id = req.user.user.id;
  console.log(req.body, "the entire post body")
  try {
    let post = await PostModel.findOne({ _id: postid });
    if (!post) {
      return res.json({ error: { msg: "Sorry this post does not exist" } });
    }
    let like = await PostModel.find({ _id: postid });

    like = await PostModel.updateOne(
      { _id: postid },
      { $addToSet: { post_likes: id } }
    );

    let sid = post.post_author;

    // insert notification and send notification via socket too
    // Notification - Starts
    let sender = {
      userType: "buyer",
      id,
      message: `Your post "${postid}" got a new like`,
    };
    let receiver = {
      userType: "seller",
      id: sid,
      message: `You liked "${postid}"`,
    };

    let toReceiver = new NotificationModel({
      type: "likes",
      reciever: sid,
      status: "new",
      message: `Your post "${postid}" got a new like`,
      sender: id,
    });
    toReceiver.save();
    let toSender = new NotificationModel({
      type: "likes",
      reciever: id,
      status: "new",
      message: `Thank you for leaving your review on "${postid}"`,
      sender: sid,
    });
    toSender.save();
    if (sender && receiver) {
      ioSocket.notifyUser(sender, receiver);
      ioSocket.notifyUser(receiver, sender);
    }
    // Notifiction - End
    let postLikes = await PostModel.findOne({ _id: postid }).select("post_likes");
    postLikes = postLikes.post_likes

    return console.log(postLikes.length)
  
    return res.json({ success: { msg: postLikes.length } });
  } catch (error) {
    console.log(error, " the erorr");
    res.status(500).json({ error: { msg: "Server error" } });
    process.exit();
  }
});

router.get("/:postid", async (req, res) => {
  try {
    const postComments = await CommentModel.find({
      commentPostId: req.params.postid,
    });
    if (!postComments) {
      return res.json({
        error: {
          msg:
            "No comment for this post yet, be the first to tell us what you think about this post",
        },
      });
    }
    return res.json({ success: postComments });
  } catch (error) {
    console.error(error.message);
    return res.json({ error: { msg: "Server Error try again " } });
  }
});
module.exports = router;
