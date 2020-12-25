const express = require("express");
const router = express.Router();
const PostModel = require("../../../database/models/seller/my-product/PostModel");

router.get("/", async (req, res) => {
  try {
    let posts = await PostModel.find({ promoted_post: true });
    // let posts = await PostModel.find({ approved_promotion: true });
    let limit = parseInt(req.query.limit);
    if (limit) {
      if (Array.isArray(posts)) {
        if (parseInt(limit) === 0) return res.json({success:[]})
        if (posts.length > parseInt(limit)) {
            // limit = limit - 1
            posts = [...posts];
            let randomPromoPosts = [];
          while (randomPromoPosts.length !== parseInt(limit)) {
            let randnum = Math.ceil(Math.floor(posts.length) * Math.random());
            let post = posts[randnum - 1];
            if (randomPromoPosts.length > 0) {
              for (let i = 0; i < randomPromoPosts.length; i++) {
                let p = randomPromoPosts[i];
                if (p !== post) {
                  randomPromoPosts.push(p);
                }
              }
            } else {
              randomPromoPosts.push(post);
            }
          }
          return res.json({ success: [...randomPromoPosts] });
        } else {
          return res.json({ success: posts });
        }
      }
    }
    res.json({ success: [...posts] });
  } catch (err) {
    console.log(err.message);
    res.json({ success: { msg: "Sorry server error, try again later" } });
  }
});

module.exports = router;
