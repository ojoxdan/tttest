const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const PromotionModel = require("../../../../database/models/seller/ads/PromotionModel");
const authUser = require("../../../auth/authUser");
const PromotionPlansModel = require("../../../../database/models/admin/PromotionPlansModel");
const PostModel = require("../../../../database/models/seller/my-product/PostModel");

let checker = [
  authUser,
  check("productid", "Please select which product you want to boost")
    .not()
    .isEmpty(),
  check("promobudget", "Please enter a valid budget for this promotion")
    .not()
    .isEmpty(),
  check("promotype", "Please select a promotion type").not().isEmpty(),
  check(
    "promoduration",
    "Please enter how long you intend to run this promotion"
  )
    .not()
    .isEmpty(),
];
router.post("/", [...checker], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  let userId = req.user.user.id;
  let {
    productid,
    promobudget,
    promotype,
    promoduration,
    promostatus,
  } = req.body;

  try {
    let post = await PostModel.findOneAndUpdate({
      _id: productid,
      post_author: userId,
    });
    if (!post) return res.json({ error: { msg: "No such Post" } });
    let newPromo = new PromotionModel({
      post_id: productid,
      user_id: userId,
      type: promotype,
      duration: promoduration,
      status: "pending",
      budget: parseInt(promobudget),
      balance: parseInt(promobudget),
    });

    await newPromo.save();
    await PostModel.findOneAndUpdate(
      {
        _id: newPromo.post_id,
        post_author: newPromo.user_id,
      },
      { promoted_post: true },
      async (err, data) => {
        let promo = await PromotionModel.findOne({ _id: newPromo._id });
        if (promo) {
          if (err) {
            return res.json({
              error: {
                msg: `Sorry an error occured while trying to update our post, plesase send a support ticket with promotion id ${promo._id} to lay your complain`,
              },
            });
          }
          return res.json({
            success: {
              msg: `Your promotion with id ${promo._id} has been set succeffully, waiting for review to go live be patient with us, you can send support ticket with promtion id ${promo._id} for quick reveiw and approval`,
            },
          });
        }

        return res.json({
          error: {
            msg:
              "Sorry error occured while trying to set up your promotion, please try again ",
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: { msg: "Server Error" } });
  }
});

router.get("/",authUser, async(req, res)=>{
  try {
    let user = req.user.user
    let myPromos = await PromotionModel.find({user_id:user.id})
    res.json({success:myPromos})
  } catch (err) {
    console.log(err)
    return res.json({error:{msg:"Server Error"}})
  }
})

router.get("/", authUser, async (req, res) => {
  try {
    let promottypes = await PromotionPlansModel.find();
    res.json({ success: promottypes });
  } catch (err) {
    console.log(err.message);
    return res.json({ error: { msg: "Server Error" } });
  }
});
module.exports = router;
