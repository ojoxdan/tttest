const express = require("express")
const AdvertModel = require("../../../database/models/seller/ads/AdvertModel")
const router = express.Router()
router.get("/", async (req, res) => {
    let area = req.query.area;
    let limit = req.query.limit;
    try {
      let ads = await AdvertModel.aggregate([
        {
          $lookup: {
            from: "tkk_advertisement_types",
            localField: "campaign_type",
            foreignField: "type_id",
            as: "adtype",
          },
        },
        { $match: { area:area } },
      ]);
      if (!ads) {
        ads = await AdvertModel.find()
      }
  console.log(ads, "the ads ")
      if (limit) {
        if (Array.isArray(ads)) {
          if (parseInt(limit) === 0) return res.json({ success: [] });
          if (ads.length > parseInt(limit)) {
            ads = [...ads];
            let randomAds = [];
            while (randomAds.length !== parseInt(limit)) {
              let randnum = Math.ceil(Math.floor(ads.length) * Math.random());
              let ad = ads[randnum - 1];
              if (randomAds.length > 0) {
                for (let i = 0; i < randomAds.length; i++) {
                  let a = randomAds[i];
                  if (a !== ad) {
                    randomAds.push(a);
                  }
                }
              } else {
                randomAds.push(ad);              }
            }
            return res.json({ success: randomAds });
          } else {
            return res.json({ success: ads });
          }
        }
      }
  
      res.json({ success: ads });
    } catch (err) {
      console.log(err.message);
      res.json({ error: { msg: "Server Error" } });
    }
  });
module.exports = router