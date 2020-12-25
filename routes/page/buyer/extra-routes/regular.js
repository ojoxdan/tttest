const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authUser = require("../../../auth/authUser");
const RegularProductModal = require("../../../../database/models/seller/my-product/RegularProductModal");
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

    let cat = await ProductCategoryModel.findOne({ name: pcat.trim() });
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
        vidFile.mv(vidPath, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ msg: "server error" });
          }
          productVideo = vidPath;
        });
      }
    }

    // product image upload function
    const uploadProductImage = async (file) => {
      console.log(file, " the image file");
      let imgPath =
        "assets/seller/product-images/regular-product-img-" +
        file.md5 +
        file.name;
      productImages.push(imgPath);

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
      // imgFile.forEach(file => uploadProductImage(file));
    }
    let newProduct = new RegularProductModal({
      productSellerId: psid,
      productCategory: pcat,
      productSubCategory: psubcat,
      productImages,
      productVideo,
      productRegion: pregion,
      productCountry: pcountry,
      productTitle: ptitle,
      productDescription: pdesc,
      productPrice: pprice,
      productAmountDistribution: pamntdist,
      productSellerPhone: psphone,
      productSellerName: psname,
      productSellerCompany: pscompany,
      productDropOffLocation: pdroploc,
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

module.exports = router;
