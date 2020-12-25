const express = require("express");
const router = express.Router();
const authUser = require("../../../auth/authUser");
const PostModel = require("../../../../database/models/seller/my-product/PostModel");

router.get("/",  async (req, res) => {
  try {
    let products = await PostModel.find();
    res.json({success:products})
  } catch (error) {
    console.error(error);
     res.json({ error: { msg: "Sever Error" } });
  }
});


router.get("/:post", async (req, res) => {
  try {
    let product = await PostModel.findOne({post_url:req.params.post});
      if (!product) {
        res.json({error:"No Such Post "})
      }
    res.json({success:product})
  } catch (error) {
    // console.error(error);
     res.json({ error: { msg: "Sever Error" } });
  }
});
router.get("/:category:/limit", async (req, res) => {
  try {
    let product = await PostModel.findOne({postUrl:req.params.post});
      if (!product) {
        res.json({error:"No Such Post "})
      }
    res.json({success:product})
  } catch (error) {
    // console.error(error);
     res.json({ error: { msg: "Sever Error" } });
  }
});

module.exports = router;
