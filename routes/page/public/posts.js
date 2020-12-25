const express = require("express");
const router = express.Router();
const PostModel = require("../../../database/models/seller/my-product/PostModel");
const UsersModel = require("../../../database/models/public/UsersModel");

router.get("/", async (req, res) => {
  // this can have limit
  // region
  // country
  // limit
  // membership

  let findQuery = {};
  let objArr = Object.keys(req.query);
  let q = req.query;
  for (let j = 0; j < objArr.length; j++) {
    const oa = objArr[j];
    if (oa == "country") {
      findQuery.post_country = q[oa];
      findQuery.post_status = "active"
    }

    if (oa == "category") {
      findQuery.post_category = q[oa];
      findQuery.post_status = "active"
    }
    if (oa == "type") {
      findQuery.post_type = q[oa];
      findQuery.post_status = "active"
    }
    if (oa == "subcategory") {
      findQuery.post_subcategory = q[oa];
      findQuery.post_status = "active"
    }
    if (oa == "region") {
      findQuery.post_region = q[oa];
      findQuery.post_status = "active"
    }
    if (oa == "membership") {
      findQuery.membership = q[oa];
      findQuery.post_status = "active"
    }
    if (oa == "promoted") {
      findQuery.approved_promotion = q[oa];
      findQuery.post_status = "active"
    }
    if (oa == "author") {
      findQuery.post_author = q[oa];
      findQuery.post_status = "active"
    }
  }
  try {
    let posts = await PostModel.find(findQuery);
    let postCount = posts.length
    if (Object.keys(findQuery).length > 0) {
       posts = await PostModel.find(findQuery).limit();
      return !posts
        ? res.json({ success: ["No post found"] })
        : res.json({ success: {posts:[...posts], count:postCount} });
    }
    posts = await PostModel.find({post_status:"active",$or:[{post_type:"buynow"},{post_type:"regular"}]});
    res.json({ success:  {posts:[...posts], count:postCount} });
  } catch (err) {
    console.log(err.message);
    res.json({ success: { msg: "Sorry server error, try again later" } });
  }
});

router.get("/:posttype", async (req, res) => {
  // this can have limit
  let findQuery = {};
  let objArr = Object.keys(req.query);
  let q = req.query;
  for (let j = 0; j < objArr.length; j++) {
    const oa = objArr[j];
    if (oa == "country") {
      findQuery.post_country = q[oa];
    }
    if (oa == "region") {
      findQuery.post_region = q[oa];
    }
    if (oa == "membership") {
      findQuery.membership = q[oa];
    }
  }
  try {
    if (findQuery) {
      let posts = await PostModel.find({
        post_type: req.params.posttype,
        ...findQuery,
        post_status:"active"
      });
      return !posts
        ? res.json({ success: ["No post found"] })
        : res.json({ success: posts });
    }

    let posts = await PostModel.findOne({ post_type: req.params.posttype, post_status:"active" });
    if (!posts) {
      return res.json({
        error: { msg: "Sorry, no content for this post type" },
      });
    }
    res.json({ success: posts });
  } catch (err) {
    console.log(err.message);
    res.json({ success: { msg: "Sorry server error, try again later" } });
  }
});
router.get("/:posttype/:category", async (req, res) => {
  // this can have limit

  let findQuery = {};
  let objArr = Object.keys(req.query);
  let q = req.query;
  for (let j = 0; j < objArr.length; j++) {
    const oa = objArr[j];
    if (oa == "country") {
      findQuery.post_country = q[oa];
    }
    if (oa == "region") {
      findQuery.post_region = q[oa];
    }
    if (oa == "membership") {
      findQuery.membership = q[oa];
    }
  }
  try {
    if (findQuery) {
      let posts = await PostModel.findOne({
        post_type: req.params.posttype,
        post_category: req.params.category,
        ...findQuery,
        post_status:"active"
      });
      return !posts
        ? res.json({ success: ["No post found"] })
        : res.json({ success: posts });
    }
    let posts = await PostModel.findOne({
      post_type: req.params.posttype,
      post_category: req.params.category,
      post_status:"active"
    });
    if (!posts) {
      return res.json({
        error: { msg: "Sorry, no post fund for this category" },
      });
    }
    res.json({ success: posts });
  } catch (err) {
    console.log(err.message);
    res.json({ success: { msg: "Sorry server error, try again later" } });
  }
});
router.get("/:posttype/:category/:posturl", async (req, res) => {
  try {
    let posts = await PostModel.findOne({
      post_type: req.params.posttype,
      post_category: req.params.category,
      post_url: req.params.posturl,
      post_status:"active"
    });
    if (!posts) {
      return res.json({
        error: { msg: "Post not found" },
      });
    }
    if (req.params.posttype === "regular") {
      posts = { ...posts._doc };
      let user = await UsersModel.findOne({ _id: posts.post_author, post_status:"active" })
        .select("phone")
        .select("businessName")
        .select("dateRegistered")
        .select("lastSeen");
      posts.user_info = user;
    }
    posts.post_likes = posts.post_likes.length;
    let overalRates =
      1 * parseInt(posts.one_stars) +
      2 * parseInt(posts.two_stars) +
      3 * parseInt(posts.three_stars) +
      4 * parseInt(posts.one_stars) +
      5 * parseInt(posts.one_stars);
    let sumRating =
      parseInt(posts.one_stars) +
      parseInt(posts.two_stars) +
      parseInt(posts.three_stars) +
      parseInt(posts.four_stars) +
      parseInt(posts.five_stars);
    posts.rating = parseInt(overalRates) / parseInt(sumRating);
    console.log(posts.rating, "the solved rating ")
    res.json({ success: posts });
  } catch (err) {
    console.log(err.message);
    res.json({ success: { msg: "Sorry server error, try again later" } });
  }
});

// /posts/post-type/category?limit=30&&memebers=true&&country=ng&&subcategory=optional
module.exports = router;
