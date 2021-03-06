const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authUser = require("../../../auth/authUser");
const PostModel = require("../../../../database/models/seller/my-product/PostModel");
const ProductCategoryModel = require("../../../../database/models/admin/ProductCategoryModel");
const { findById } = require("../../../../database/models/seller/my-product/PostModel");

let checker = [
  authUser,
  check("pcat", "Please select a product Category").not().isEmpty(),
  check("pregion", "Please enter the product Region").not().isEmpty(),
  check("pcountry", "Please enter product Country").not().isEmpty(),
  check("ptitle", "Please enter the product Title").not().isEmpty(),
  check("pdesc", "Please enter the product Description").not().isEmpty(),
  check("pprice", "Please enter the product Price").not().isEmpty(),
  check("pamntdist", "Please enter Amount in Distribution").not().isEmpty(),
  check("psphone", "Please enter your Phone Number").not().isEmpty(),
  check("psname", "Please enter your Name").not().isEmpty(),
  check("pscompany", "Please enter Company Name").not().isEmpty(),
];
router.post("/:postid", [...checker], async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  let {
    pcat,
    psubcat,
    pregion,
    pcountry,
    ptitle,
    pdesc,
    pprice,
    pamntdist,
    psphone,
    psname,
    pscompany,
    pdroploc,
  } = req.body;

  try {
    let cat = await ProductCategoryModel.findOne({ name: pcat });
    if (!cat) {
      return res
      .status(404)
      .json({
        error: { msg: "Sorry, you have entered an invalid category" },
      });
    }
    pcat = cat.name;
    if (psubcat) {
      if (!cat.subCategories.some((sub) => psubcat === sub)) {
        return res
        .status(404)
        .json({
          error: { msg: "Sorry, you have entered an empty Subcategory" },
        });
      }
      psubcat = cat.subCategories.filter((sub) => sub === psubcat)[0];
    }
    // check and upload product images
    let imgFile = req.files.pimg;
    let vidFile;
    if (req.files.pvid) {
      vidFile = req.files.pvid;
    }
    
    let productImages = [];
    let productVideo;
    
    if (!imgFile || Object.keys(imgFile).length === 0) {
      return res
      .status(400)
      .json({ error: { msg: "Please include product image" } });
    }
    if (Object.keys(imgFile).length > 0) {
      let tf = Object.keys(imgFile);
      for (let i = 0; i < tf.length; i++) {
        if (tf.size > 3000000) {
          return res
          .status(400)
          .json({ error: { msg: "Your images shuuld be less or equl 3mb" } });
        }
      }
    }
    
    // check and upload product videos
    let vidPath = null;
    console.log(vidFile, " the vid file ");
    if (vidFile || typeof vidFile == "object") {
      if (Object.keys(vidFile).length > 0) {
        vidPath =
        "assets/seller/product-videos/buy-now-product-video-" +
        vidFile.md5 +
        vidFile.name;
        let vidurl =
        "/seller/product-videos/buy-now-product-video-" +
        vidFile.md5 +
        vidFile.name;
        vidFile.mv(vidPath, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ msg: "server error" });
          }
          productVideo = vidurl;
        });
      }
    }
    
    // product image upload function
    const uploadProductImage = async (file) => {
      console.log(file, " the image file");
      let imgPath =
      "assets/seller/product-images/buy-now-product-img-" +
      file.md5 +
      file.name;
      let url =
      "/seller/product-images/buy-now-product-img-" + file.md5 + file.name;
      productImages.push(url);
      
      await file.mv(imgPath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "server error" });
        }
      });
    };
    
    // get  user id from the req header
    let user = req.user.user;
    // product seller id from the user object
    let psid = user.id;
    
    if (imgFile.hasOwnProperty("name")) {
      uploadProductImage(imgFile);
    } else {
      for (let i = 0; i < imgFile.length; i++) {
        const element = imgFile[i];
        uploadProductImage(imgFile[i]);
      }
    }
    
    // convert post title to a url kinda
    let str = ptitle;
    str = str.trim();
    str = str.toLowerCase();
    
    let strArr = [];
    for (let i = 0; i < str.length; i++) {
      strArr.push(str[i]);
      if (/\s/.test(str[i]) || /\W/.test(str[i])) {
        strArr[i] = "-";
      }
    }
    let stt = "";
    for (let i = 0; i < strArr.length; i++) {
      stt = stt + strArr[i];
    }
    let postUrl = stt;
    return console.log(req.body, "all the post req body ")

    let newProduct = await PostModel.findOneAndUpdate({_id:req.params.postid},{
      post_author: psid,
      post_category: pcat,
      post_subcategory: psubcat,
      post_images: productImages,
      post_video: productVideo,
      post_region: pregion,
      post_country: pcountry,
      post_title: ptitle,
      post_url: postUrl,
      post_description: pdesc,
      post_price: pprice,
      post_distribution: pamntdist,
      post_author_phone: psphone,
      post_author_company: pscompany,
      product_dropoff_location: pdroploc,
      post_type: "buynow"
    });
    newProduct.save();
    res
      .status(200)
      .json({
        success: {
          msg: "Your post has been successfully submited for review ",
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { msg: "Sever Error" } });
  }
});

router.get("/",authUser , async(req,res)=>{
  try {
    let user = req.user.user
    let findQuery = {
      post_author:user.id,
    }
    if (req.params.type) {
      findQuery.post_type =  req.params.type
    }
    let posts = await PostModel.find(findQuery).limit(parseInt(req.params.limit))
    res.json({success:posts})
    
  } catch (err) {
    console.log(err)
    process.exit(200)
  }
})

router.get("/:post_id",authUser , async(req,res)=>{
  try {
    let user = req.user.user
    let findQuery = {
      post_author:user.id,
      _id:req.params.post_id,
    }
    if (req.params.type) {
      findQuery.post_type =  req.params.type
    }
    let posts = await PostModel.findOne(findQuery).limit(parseInt(req.params.limit))
    res.json({success:posts})
    
  } catch (err) {
    console.log(err)
    process.exit(200)
  }
})

// delete 
router.post("/delete/image",authUser , async(req,res)=>{
  try {
    let user = req.user.user
    let findQuery = {
      post_author:user.id,
      _id:req.body.postid,
      post_type:"buynow"
    }

    let post = await PostModel.findOne(findQuery).select("post_images")
    let images = post.post_images
    let newImages = []
    if (Array.isArray(post.post_images)) {
      for (let i = 0; i < images.length; i++) {
        let img = images[i];
        if (img !== req.body.img) {
          newImages.push(img)
        }
        
      }
    }
   let imgs =  await PostModel.findOneAndUpdate(findQuery, {
      post_images:newImages
    }).select("post_images")
    res.json({success:imgs})
    
  } catch (err) {
    console.log(err)
    process.exit(200)
  }
})

module.exports = router;

// post_author
// post_category
// post_subcategory
// post_images
// post_video
// post_region
// post_country
// post_title
// post_url
// post_description
// post_author_contact
// post_negotiable
// post_price
// post_distribution
// post_author_phone
// post_author_name
// post_author_company
// product_dropoff_location
// post_date
// post_likes
// post_views
// post_type
// business_industry
// business_function
// job_role
// job_qualification
// years_of_experience
// skills
// max_age
// gender
// job_sallary
// job_application_deadline
// advance_listing
// job_type
// job_education_specialization
