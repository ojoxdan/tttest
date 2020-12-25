const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const PromotionPlansModel = require('../../../database/models/admin/PromotionPlansModel')

const checker = [
    authUser,
    [
        check('pname','Please enter the campaign type Name').not().isEmpty(),
        check('pprice','Please enter the campaign type Price').not().isEmpty(),
        check('pdescription','Please enter the campaign descripton ').not().isEmpty(),
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({error:errors.array()})
    }

    try {
      const {pname,pprice,pdescription} = req.body
        // product image upload function
        const uploadProductImage = async (file) => {
            console.log(file, " the image file");
            let imgPath =
              "assets/public/campaign/promo-sample-img-" +
              file.md5 +
              file.name;
            let url =
              "/public/campaign/promo-sample-img-" + file.md5 + file.name;
            // productImages.push(url);
      
            await file.mv(imgPath, (err) => {
              if (err) {
                console.error(err);
                return res.json({success:{msg: "Error occored while uploading image tryagain" }});
              }
            });
            return url
          };
        if (!req.files.pimage) return res.json({error:{msg:"please make sure you provide a valid sample image"}})
        let imageUrl = await uploadProductImage(req.files.pimage)
    let inputExist =  await PromotionPlansModel.findOne({name:pname})
    if (inputExist) {
        return res.json({error:{msg:"Sorry ths Campaign Type already exist"}})
    }
    
    const PromoPlan =  new PromotionPlansModel({
        name:pname,
        price:pprice,
        description:pdescription,
        sample_image:imageUrl
    })
    await PromoPlan.save();
    return res.status(200).json({success:PromoPlan})
    } catch (err) {
      res.json({error:{msg:"Server Error"}})
      console.log(err.message, "  error message")
    }
})

router.get("/", authUser,async(req,res)=>{
  try {
      let pTypes = await PromotionPlansModel.find()
      res.json({success:pTypes})
  } catch (err) {
    console.log(err.message)
    res.json({error:{msg:"Server Error"}})
  }
})
module.exports = router

// name
// price
// imageWidth
// imageHeight