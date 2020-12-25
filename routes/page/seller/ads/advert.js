const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const AdvertModel = require("../../../../database/models/seller/ads/AdvertModel");
const authUser = require("../../../auth/authUser");
const AdvertisementTypesModel = require("../../../../database/models/admin/AdvertisementTypesModel");

let checker = [
  authUser,
  check("adbudget", "Please enter a valid budget for this advertisment")
    .not()
    .isEmpty(),
  check("adtype", "Please select a campaign type").not().isEmpty(),
  check("adduration", "Please select a campaign type").not().isEmpty(),
  //   check("adLink", "Please enter a link for this campaign").not().isEmpty(),
  //   check("adLink", "Please enter a valid Link").isURL(),
];
router.post("/", [...checker], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array() });
  }

  let user_id = req.user.user.id;
  let { adbudget, adtype, adduration } = req.body;

  // return console.log(req.files, "all files sent along")
  if (!req.files.adimage) {
    return res.json({
      error: { msg: "Please upload an image for your advertisment" },
    });
  }
  const advertType = await AdvertisementTypesModel.findOne({
    _id: req.body.adtype,
  });
  if (!advertType) return res.json({error:{msg:"No such advertisment type "}})
  let sumtotal = parseInt(advertType.price) * parseInt(adduration);
  if (sumtotal !== parseInt(adbudget))
    return res.json({
      error: {
        msg:
          "Sorry, your budget can not get you this Ad type (choose a sizable one)",
      },
    });

  const uploadProductImage = async (file) => {
    let imgPath = "assets/seller/ads-images/ads-img-" + file.md5 + file.name;
    let url = "/seller/ads-images/ads-img-" + file.md5 + file.name;
    await file.mv(imgPath, (err) => {
      if (err) {
        console.error(err);
        return res.json({
          success: { msg: "Error occored while uploading image tryagain" },
        });
      }
    });
    return url;
  };
  if (!req.files.adimage)
    return res.json({
      error: { msg: "please make sure you provide a valid sample image" },
    });
  let imageUrl = await uploadProductImage(req.files.adimage);
  let endDate = new Date().setDate(adduration);
  try {
    let advert = new AdvertModel({
      user_id,
      campaign_type: adtype,
      image: imageUrl,
      start_date: Date.now(),
      end_date: endDate,
      balance: adbudget,
      budget: adbudget,
      status: "pending",
      area:advertType.area
    });
    await advert.save();
    let adverts = await AdvertModel.findOne({ _id: advert._id });
    return res.json({ success: { msg: adverts } });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: { msg: "Server Error" } });
  }
});

router.get("/", authUser, async (req, res) => {
  let user_id = req.user.user.id;
  try {
    // let adverts = await AdvertModel.find({user_id})
    let adverts = await AdvertModel.aggregate([
      {
        $lookup: {
          from: "tkk_advertisement_types",
          localField: "campaign_type",
          foreignField: "ad_id",
          as: "type",
        },
      },
      {
        $match: {
          user_id,
        },
      },
    ]);
    if (!adverts) {
      return res.json({
        error: { msg: "Sorry you have no runny advert, create one now " },
      });
    }
    res.json({ success: adverts });
  } catch (err) {
    console.log(err.message);
    res.json({ error: { msg: "Server Error" } });
  }
});
module.exports = router;

// userId
// advertCampaignType
// advertImages
// advertLink
// advertDuration
// advertStatus
// advertBudget
