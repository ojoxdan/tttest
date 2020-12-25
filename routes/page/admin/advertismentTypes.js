const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authUser = require("../../auth/authUser");
const AdvertisementTypesModel = require("../../../database/models/admin/AdvertisementTypesModel");
const CampaignDurationModel = require("../../../database/models/admin/CampaignDurationModel");

const checker = [
  authUser,
  [
    check("tname", "Please enter the Advertisement type Name").not().isEmpty(),
    check("tprice", "Please enter the Advertisement type Price")
      .not()
      .isEmpty(),
    check("tdescription", "Please enter the Advertisement type descripton ")
      .not()
      .isEmpty(),
    check("twidth", "Please enter the Advertisement type width ")
      .not()
      .isEmpty(),
    check("theight", "Please enter the Advertisement type height ")
      .not()
      .isEmpty(),
    check("tarea", "Please enter the Advertisement display area ")
      .not()
      .isEmpty(),
  ],
];
router.post("/", [...checker], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array() });
  }

  try {
    const { tname, tprice, tdescription, twidth, theight, tarea } = req.body;
    // product image upload function
    const uploadProductImage = async (file) => {
      let imgPath =
        "assets/public/campaign/ads-sample-img-" + file.md5 + file.name;
      let url = "/public/campaign/ads-sample-img-" + file.md5 + file.name;
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
    if (!req.files.timage)
      return res.json({
        error: { msg: "please make sure you provide a valid sample image" },
      });
    let imageUrl = await uploadProductImage(req.files.timage);
    let inputExist = await AdvertisementTypesModel.findOne({ name: tname });
    if (inputExist) {
      return res.json({
        error: { msg: "Sorry ths Advertisement Type already exist" },
      });
    }

    const AdsTypes = new AdvertisementTypesModel({
      name: tname,
      price: tprice,
      description: tdescription,
      sample_image: imageUrl,
      width: twidth,
      height: theight,
      area: tarea,
    });
    AdsTypes.type_id =  AdsTypes._id
    await AdsTypes.save();
    return res.status(200).json({ success: AdsTypes });
  } catch (err) {
    res.json({ error: { msg: "Server Error" } });
    console.log(err.message, "  error message");
  }
});

router.get("/", authUser, async (req, res) => {
  try {
    let adsTypes = await AdvertisementTypesModel.find();
    let durations = await CampaignDurationModel.find();
    let adt = { adsTypes, durations };
    return res.json({ success: adt });
  } catch (err) {
    console.log(err.message);
    res.json({ error: { msg: "Server Error" } });
  }
});
module.exports = router;

// name
// price
// imageWidth
// imageHeight
