const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authUser = require("../../../auth/authUser");
const PostModel = require("../../../../database/models/seller/my-product/PostModel");


router.post("/reset/status/:post_id",authUser , async(req,res)=>{
  try {
    let user = req.user.user
    let findQuery = {
      post_author:user.id,
      _id:req.body.id
    }
    if (req.params.type) {
      findQuery.post_type =  req.params.type
    }
    let post = await PostModel.findOneAndUpdate(findQuery, {
      post_status:req.body.status
    }).select("post_status")
    res.json({success:post})
    
  } catch (err) {
    console.log(err)
    process.exit(200)
  }
})
router.get("/",authUser , async(req,res)=>{
  console.log("post ")
  try {
    let user = req.user.user
    let findQuery = {
      post_author:user.id,
    }
    let posts = await PostModel.find()
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
      _id:post_id,
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
