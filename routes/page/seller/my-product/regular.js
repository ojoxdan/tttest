const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authUser = require("../../../auth/authUser");
const PostModel = require("../../../../database/models/seller/my-product/PostModel");
const ProductCategoryModel = require("../../../../database/models/admin/ProductCategoryModel");

let checker = [
  authUser,
  check("pcat", "Please select a product Category").not().isEmpty(),
  // check('pregion','Please enter the product Region').not().isEmpty(),
  // check('pcountry','Please enter product Country').not().isEmpty(),
  // check('ptitle','Please enter the product Title').not().isEmpty(),
  // check('pdesc','Please enter the product Description').not().isEmpty(),
  // check('pprice','Please enter the product Price').not().isEmpty(),
  // check('pamntdist','Please enter Amount in Distribution').not().isEmpty(),
  // check('psphone','Please enter your Phone Number').not().isEmpty(),
  // check('psname','Please enter your Name').not().isEmpty(),
  // check('pscompany','Please enter Company Name').not().isEmpty()
];
router.post("/", [...checker], async (req, res) => {
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
          "assets/seller/product-videos/regular-product-video-" +
          vidFile.md5 +
          vidFile.name;
        const vidurl =
          "/seller/product-videos/regular-product-video-" +
          vidFile.md5 +
          vidFile.name;
          productVideo = vidurl;
        vidFile.mv(vidPath, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ msg: "server error" });
          }
        });
      }
    }

    // product image upload function
    const uploadProductImage = async (file) => {
      let imgPath =
        "assets/seller/product-images/regular-product-img-" +
        file.md5 +
        file.name;
      let imgurl =
        "/seller/product-images/regular-product-img-" + file.md5 + file.name;
      productImages.push(imgurl);

      await file.mv(imgPath, (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ msg: "server error" });
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
      // imgFile.forEach(file => uploadProductImage(file));
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

    let newProduct = new PostModel({
      post_author: psid,
      post_category: pcat,
      post_subcategory: psubcat,
      post_images: productImages,
      post_region: pregion,
      post_country: pcountry,
      post_title: ptitle,
      post_video: productVideo,
      // post_url:postUrl,
      post_description: pdesc,
    //   post_negotiable,
      post_price: pprice,
      post_distribution: pamntdist,
      post_author_phone: psphone,
      post_author_name: psname,
      post_author_company: pscompany,
      product_dropoff_location: pdroploc,
      post_type: "regular",
    });
    newProduct.post_id =  newProduct._id
    newProduct.post_url=postUrl+"-"+newProduct._id
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
    res.status(500).json({ error: { msg: "Sever Error" } });
    process.exit()
  }
});




router.get("/:post_id",authUser , async(req,res)=>{
  try {
    let user = req.user.user
    let findQuery = {
      post_author:user.id,
      _id:req.params.post_id,
      post_type:"regular"
    }
    console.log(req.params.post_id,user.id)
    let posts = await PostModel.findOne({...findQuery})
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



// ******************* Seller Buynow post update ******************************



router.post("/edit/:postid", [...checker], async (req, res) => {
  console.log("then why ? ")
  let errors = validationResult(req);
  let momentStamp = new Date().getTime()
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
    pscompany,
  } = req.body;
  try {
    let upost = await PostModel.findOne({
      post_author:req.user.user.id,
      _id:req.params.postid,
      post_type:"regular"
    }).select("post_images")
    if (!upost) return res.json({error:{msg:"Sorry, this post does not exit, you don't have enough permission to edit it "}})
    let currentImages = upost.post_images
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
    let imgFile = {};
    let vidFile = {};
    if (req.files) {      
      if (req.files.pvid !== null) {
        vidFile = req.files.pvid;
      }
      if (req.files.pimg !== null) {
        imgFile = req.files.pimg;
      }
    }
    
    let productImages = [];
    let productVideo;
    
    if (imgFile) {      
      if (imgFile || Object.keys(imgFile).length > 0) {
        let newImgs = Object.keys(imgFile).length
        if (newImgs.length + currentImages.length > 10) {        
          return res.json({ error: { msg: "Sorry the entire images can not be more that 10 " } });
        }
      }
    }
    if (imgFile) {
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
    }
    
    // check and upload product videos
    let vidPath = null;
    if (vidFile) {
      if (Object.keys(vidFile)) {
        if (Object.keys(vidFile).length > 0) {
          
          if (Object.keys(vidFile).length > 0) {
            vidPath =
            "assets/seller/product-videos/regular-product-video-" +
            vidFile.md5 +momentStamp+
            vidFile.name;
            let vidurl =
            "/seller/product-videos/regular-product-video-" +
            vidFile.md5 +momentStamp+
            vidFile.name;
            productVideo =  vidurl;
            await vidFile.mv(vidPath, async(err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ msg: "server error" });
              }
              console.log(vidurl,"this is the video url ")
          });
        }
        }
      }
      }
      
      // product image upload function
      const uploadProductImage = async (file) => {
        let imgPath =
        "assets/seller/product-images/regular-product-img-" +
        file.md5 +
        file.name;
        let url =
        "/seller/product-images/regular-product-img-" + file.md5 + file.name;
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
      let imgcount = 0
      if (imgFile) {
        if (Object.keys(imgFile).length > 0) {strArr
          if (imgFile.hasOwnProperty("name")) {
            uploadProductImage(imgFile);
          } else {
            for (let i = 0; i < imgFile.length; i++) {
              const element = imgFile[i];
              imgcount++
              uploadProductImage(imgFile[i]);
            }
          }
        }
      }
      // return console.log(imgcount, "the images files ")
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
      let updatedPost = {
        post_author: psid,
        post_category: pcat,
        post_subcategory: psubcat,
        post_region: pregion,
        post_country: pcountry,
        post_title: ptitle,
        post_description: pdesc,
        post_price: pprice,
        post_distribution: pamntdist,
        post_author_company: pscompany,
        post_type: "regular"
      }
      if (productImages.length > 0) {
        updatedPost = {...updatedPost, post_images:[...currentImages, ...productImages]}
      }
    if (productVideo) {
      updatedPost = {...updatedPost, post_video:productVideo}
    }
    
    
    let newProduct = await PostModel.findOneAndUpdate({_id:req.params.postid},{...updatedPost});
    newProduct.save();
    res
    .status(200)
    .json({
      success: {
        msg: "Your post has been successfully submited for review ",
      },
    });
    console.log("hey it works!")
  } catch (error) {
    console.error(error);
    return res.json({ error: { msg: "Sever Error" } });
  }
});


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
