const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const ioSocket = require("../../../server");
const NotificationModel = require("../../../database/models/public/NotificationModel");
const PostModel = require("../../../database/models/seller/my-product/PostModel");
const OrderModel = require("../../../database/models/buyer/OrderModel");
const ReviewModel = require("../../../database/models/buyer/ReviewModel");
const authUser = require("../../auth/authUser");
const {
  find,
} = require("../../../database/models/seller/my-product/PostModel");
const checker = [
  authUser,
  [
    check("postid", "Please enter the Post ID").not().isEmpty(),
    check("username", "Please enter your Name").not().isEmpty(),
    check("stars", "Sorry you can not leave the stars empty ").not().isEmpty(),
    check("detail", "Please enter what you think about this post")
      .not()
      .isEmpty(),
    check("title", "Please enter what you think about this post")
      .not()
      .isEmpty(),
  ],
];
router.post("/", [...checker], async (req, res) => {
  console.log(req.body, "the request body");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  let userid = req.user.user.id;
  const { postid, username, stars, detail, orderid, title } = req.body;
  try {
    const id = req.user.user.id;
    let post = await PostModel.findOne({ _id: postid });
    if (!post) {
      return res
        .json({ error: { msg: "No such post" } })
        .status(404)
        .json({ error: { msg: "Sorry this post does not exist" } });
    }
    //
    const ObjectId = mongoose.Types.ObjectId;
    let order = await OrderModel.aggregate([
      {
        $lookup: {
          from: "tkk_posts",
          localField: "product_id",
          foreignField: "post_id",
          as: "post",
        },
      },
      { $match: { product_id: postid } },
      { $match: { _id: ObjectId(orderid) } },
    ]);
    if (!order) {
      return res.json({
        error: {
          msg:
            "Please make sure this product has been ordered and delivered to you already",
        },
      });
    }
    let reviewExist = await ReviewModel.findOne({
      user_id: userid,
      post_id: postid,
    });
    if (reviewExist) {
      return res.json({
        error: { msg: "You can not place multiple review per product" },
      });
    }
    let sid = order[0].post[0].post_author;
    let review = new ReviewModel({
      title,
      user_id: id,
      post_id: postid,
      user_name: username,
      stars: stars,
      detail: detail,
      seller_id: sid,
    });
    review.save();

    let starToReview = {}
    if (parseInt(stars) === 1 ) {
      starToReview.one_stars = stars
    }
    if (parseInt(stars) === 2 ) {
      starToReview.two_stars = stars
    }
    if (parseInt(stars) === 3 ) {
      starToReview.three_stars = stars
    }
    if (parseInt(stars) === 4 ) {
      starToReview.four_stars = stars
    }
    if (parseInt(stars) === 4 ) {
      starToReview.five_stars = stars
    }
    await PostModel.findOneAndUpdate(
      { _id: postid },
      {
        $inc: {
          post_reviews: 1,
          post_stars: stars,
          ...starToReview
        },
      }
    );
    console.log("ok review inserted ");
    // insert notification and send notification via socket too
    // Notification - Starts
    let sender = {
      userType: "buyer",
      id: userid,
      message: `You have a new review on your post "${postid}"  with ${stars} stars`,
    };
    let receiver = {
      userType: "seller",
      id: sid,
      message: `Thank you for leaving your review on "${postid}"`,
    };

    let toReceiver = new NotificationModel({
      type: "review",
      reciever: sid,
      status: "new",
      message: `You have a new review on your post "${postid}"  with ${stars} stars`,
      sender: userid,
    });
    toReceiver.save();
    let toSender = new NotificationModel({
      type: "review",
      reciever: userid,
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
    res.json({ success: { msg: "Thanks for leaving your review" } });
  } catch (error) {
    console.log(error, "server error ");
    res.status(500).json({ error: { msg: "Server error" } });
    process.exit();
  }
});
module.exports = router;

// @GET METHOD FOR REVIEWS

router.get("/", authUser, async (req, res) => {
  let user = req.user.user;
  try {
    let reviewedItems = await ReviewModel.aggregate([
      {
        $match: { user_id: user.id },
      },
      { $project: { post_id: 1, _id: 0 } },
    ]);
    let i = 0;
    let myReviews = [];
    while (myReviews.length !== reviewedItems.length) {
      myReviews.push(reviewedItems[i].post_id);
      i++;
    }
    // Note: in future this should only match where the order status is delivered or completed as the case may be  *********************************************************
    let orders = await OrderModel.find({ buyer_id: user.id,
    // order_status:"completed"
    });
    let productItems = [];
    for (let i = 0; i < myReviews.length; i++) {
      for (let j = 0; j < orders.length; j++) {
        for (let o = 0; o < orders[j].items.length; o++) {
          let item = orders[j].items[o];
          if (String(myReviews[i]) !== String(item._id)) {
            item = {
              date_delivered: orders[j].date_delivered,
              status: orders[j].order_status,
              ...item,
            };
            productItems.push(item);
          }
        }
      }
    }
    res.json({ success: productItems });
  } catch (err) {
    console.log(err, "the catch error");
  }
});

// title
// user_id
// seller_id
// post_id
// user_name
// stars
// detail
