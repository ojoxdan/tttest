const express = require("express");
const BuyNowProductModel = require("../../../database/models/seller/my-product/BuyNowProductModel");
const router = express.Router();

router.post("/", async (req, res) => {
  // res.json({success:{data:"Search Item here "}})
  // return res.json({test:req.params})
  let query = req.body.query && req.body.query.trim();
  let category = req.body.category;
  let limit = req.body.limit && parseInt(req.body.limit.trim());
  if (req.body.category) {
    let products = await BuyNowProductModel.find();
    if (!products) return 
    let s = query;
    let matches = [];
    // return console.log(products)
    let titles = products
    s = s.split(" ");
    for (let i = 0; i < s.length; i++) {
      const w1 = s[i];
      if (w1 !== " ") {
        for (let j = 0; j < titles.length; j++) {
          let title = titles[j].productTitle;
          let oneMatch = [];
          let arrtitle = title.split(" ");
          for (let r = 0; r < arrtitle.length; r++) {
            const w2 = arrtitle[r];
            if (w2 == s[i]) {
              oneMatch.push(arrtitle[r]);
            }
          }
          if (
            oneMatch.length > 0
            ) {
              matches.push(titles[j]);
            }
          }
        }
      }
      
      //  return  console.log(matches, " All the matches ");
      console.log(matches, "Search query now here ")
      return res.json({success:matches})
  }
});

module.exports = router;
