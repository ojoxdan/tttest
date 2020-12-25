const config = require("config");
const express = require("express");
const PostModel = require("../../../database/models/seller/my-product/PostModel");
const UsersModel = require("../../../database/models/public/UsersModel");
const authUser = require("../../auth/authUser");
const ChatModel = require("../../../database/models/public/ChatModel");
const router = express.Router();

router.get("/", (req, res) => {});
router.get("/:utype/:pid", async (req, res) => {
  try {
    if (!req.params.pid)
      return res.json({
        error: "Sorry, you need to specify a valid product id ",
      });
    let product = await PostModel.findOne({ post_id: req.params.pid });
    if (!product)
      return res.json({ error: "Sorry, no product matches your request " });

    return res.json({ success: product._doc });
  } catch (err) {
    console.log(err.message);
    return res.json({ msg: "Server Error" });
  }
});
// recommendations
// adjust the db nameing convention to use just buyer, seller or admin as the id holders
router.get("/my-messages", authUser, async (req, res) => {
  try {
    let userid = req.user.user.id;
    let usertype = req.user.user.usertype;
    let query = {};
    if (usertype === "buyer") {
      query.buyer_id = userid;
    }
    if (usertype === "seller") {
      query.seller_id = userid;
    }
    let chats = await ChatModel.find(query).select("-conversations");
    return res.json({ success: chats });
  } catch (err) {
    console.log(err.message);
    res.json({ error: { msg: "Server Error" } });
  }
});

router.get("/my-messages/:chatid/chat", authUser, async (req, res) => {
  try {
    let userid = req.user.user.id;
    let chat = {}
    let chats1 = await ChatModel.findOne({_id:req.params.chatid,receiver:userid});
    let chats2 = await (await ChatModel.findOne({_id:req.params.chatid,sender:userid}))
    if (!chats1) chat = await(chats2).toObject()
    if (!chats2) chat = await(chats1).toObject()
    if (!chat) return res.json({ success: {} });
    let post = await PostModel.findOne({
      _id: chat.product_id,
    });
    // chat = post;
    // return console.log(chat)
    return res.json({ success: {...chat, post} });
  } catch (err) {
    console.log(err);
    res.json({ error: { msg: "Server Error" } });
  }
});

module.exports = router;
