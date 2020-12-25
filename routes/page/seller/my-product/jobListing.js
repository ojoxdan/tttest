const express = require("express");
const { check, validationResult } = require("express-validator");
const config = require("config");
const router = express.Router();
const authUser = require("../../../auth/authUser");
const PostModel = require("../../../../database/models/seller/my-product/PostModel");

let checker = [
  authUser,
  check("jobcat", "Please select job category").not().isEmpty(),
  check("jobsubcat", "Please select job sub category").not().isEmpty(),
  check("jobcountry", "Please select job job country").not().isEmpty(),
  check("jobregion", "Please select job job region").not().isEmpty(),
  check("jobtitle", "Please enter Title").not().isEmpty(),
  check("jobdesc", "Please enter job Description").not().isEmpty(),
  check("jobbizindustry", "Please enter job Business Industry").not().isEmpty(),
  check("jobtype", "Please select job Type").not().isEmpty(),
  check("jobbizfxn", "Please enter  job Business Function").not().isEmpty(),
  check("jobrole", "Please enter  job Role ").not().isEmpty(),
  check("jobminqualify", "Please enter  job Minmum qualificatino")
    .not()
    .isEmpty(),
  check("jobyearsofexp", "Please enter  job Years Of Experience")
    .not()
    .isEmpty(),
  check("jobspec", "Please enter  job  Specialization").not().isEmpty(),
  check("jobskills", "Please enter  job Skills").not().isEmpty(),
  check("jobmaxage", "Please enter  job Applicant Maximum Age").not().isEmpty(),
  check("jobgenderpref", "Please select job  Gender Preference ")
    .not()
    .isEmpty(),
  check("jobsalary", "Please enter  job Monthly Salary").not().isEmpty(),
  check("jobappxndeadline", "Please enter job Application Deadline region")
    .not()
    .isEmpty(),
  check("jobadvncelisting", "Please select job Advance Listing Option")
    .not()
    .isEmpty(),
];
router.post("/", [...checker], async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  let {
    jobcat,
    jobsubcat,
    jobcountry,
    jobregion,
    jobtitle,
    jobdesc,
    jobbizindustry,
    jobtype,
    jobbizfxn,
    jobrole,
    jobminqualify,
    jobyearsofexp,
    jobspec,
    jobskills,
    jobmaxage,
    jobgenderpref,
    jobsalary,
    jobappxndeadline,
    jobadvncelisting,
  } = req.body;
  
  try {
    let imgFile = req.files.jimg;
    if (!imgFile || Object.keys(imgFile).length === 0) {
      return res
      .status(400)
      .json({ error: { msg: "Please include product image" } });
    }
    
    let jobimages = [];
    
    const uploadProductImage = async(file) => {
      let imgPath =
      "assets/seller/product-images/job-img-" + file.md5 + file.name;
      let imgurl = "/seller/product-images/job-img-" + file.md5 + file.name;
      jobimages.push(imgurl);
      await file.mv(imgPath, async(err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "server error" });
        }
      });
    };
    
    if (imgFile.hasOwnProperty("name")) {
      await uploadProductImage(imgFile);
    } else {
      // if (Object.keys(imgFile).length > 0) 
      let tf = Object.keys(imgFile);
      if (Object.keys(imgFile).length > 0) {
        for (let i = 0; i < tf.length; i++) {
          console.log("this image is correct ")
          if (tf.size > 3000000) {
            return res.status(400).json({
              error: { msg: "Your images should be less or sequal 3mb" },
            });
          }
         await uploadProductImage(tf[i])
        }
      }
    }
    
    let user = req.user.user;

    // convert post title to a url kinda
    let str = jobtitle;
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
    let jobListing = new PostModel({

      post_author: user.id,
      post_category: jobcat,
      post_subcategory: jobsubcat,
      post_images: jobimages,
      post_country: jobcountry,
      post_region: jobregion,
      post_title: jobtitle,
      post_url:postUrl,
      post_description: jobdesc,
      post_type: "jobs",
      business_industry: jobbizindustry,
      business_function: jobbizfxn,
      job_role: jobrole,
      job_qualification: jobminqualify,
      years_of_experience: jobyearsofexp,
      skills: jobskills,
      max_age: jobmaxage,
      gender: jobgenderpref,
      job_salary: jobsalary,
      job_application_deadline: jobappxndeadline,
      advance_listing: jobadvncelisting,
      job_type: jobtype,
      job_education_specialization: jobspec,
    });
    jobListing.post_id =  jobListing._id
    jobListing.post_url = postUrl+"-"+jobListing._id;
    await jobListing.save();
    // console.log(user.id, jobimages)
    res.status(200).json({
      success: {
        msg: "Your post has been successfully submited for review ",
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: { msg: "Sever Error" } });
  }
});




router.get("/:post_id",authUser , async(req,res)=>{
  try {
    let user = req.user.user
    let findQuery = {
      // post_author:user.id,
      _id:req.params.post_id,
      post_type:"jobs"
    }
    let posts = await PostModel.findOne({...findQuery})
    // return console.log(JSON.parse(posts.job_salary).from, "the entire post ")
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
      post_type:"jobs"
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
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  console.log("the job is here ")
  let {
    jobcat,
    jobsubcat,
    jobcountry,
    jobregion,
    jobtitle,
    jobdesc,
    jobbizindustry,
    jobtype,
    jobbizfxn,
    jobrole,
    jobminqualify,
    jobyearsofexp,
    jobspec,
    jobskills,
    jobmaxage,
    jobgenderpref,
    jobsalary,
    jobappxndeadline,
    jobadvncelisting,
  } = req.body;
  
  try {
    let imgFile = {}
    if (req.files) {
      if (req.files.jimg) {
        imgFile = req.files.jimg;
      }
    }
    // if (!imgFile || Object.keys(imgFile).length === 0) {
    //   return res.json({ error: { msg: "Please include Job image" } });
    // }
    
    let jobimages = [];
    
    const uploadProductImage = async(file) => {
      let imgPath =
      "assets/seller/product-images/job-img-" + file.md5 + file.name;
      let imgurl = "/seller/product-images/job-img-" + file.md5 + file.name;
      jobimages.push(imgurl);
      await file.mv(imgPath, async(err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "server error" });
        }
      });
    };
    
    if (imgFile.hasOwnProperty("name")) {
      await uploadProductImage(imgFile);
    } else {
      // if (Object.keys(imgFile).length > 0) 
      let tf = Object.keys(imgFile);
      if (Object.keys(imgFile).length > 0) {
        for (let i = 0; i < tf.length; i++) {
          console.log("this image is correct ")
          if (tf.size > 3000000) {
            return res.status(400).json({
              error: { msg: "Your images should be less or sequal 3mb" },
            });
          }
         await uploadProductImage(tf[i])
        }
      }
    }
    
    let user = req.user.user;

    // convert post title to a url kinda
    let str = jobtitle;
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
    let jobListing = await PostModel.findOneAndUpdate({_id:req.params.postid},{
      post_author: user.id,
      post_category: jobcat,
      post_subcategory: jobsubcat,
      post_images: jobimages,
      post_country: jobcountry,
      post_region: jobregion,
      post_title: jobtitle,
      post_url:postUrl,
      post_description: jobdesc,
      post_type: "jobs",
      business_industry: jobbizindustry,
      business_function: jobbizfxn,
      job_role: jobrole,
      job_qualification: jobminqualify,
      years_of_experience: jobyearsofexp,
      skills: jobskills,
      max_age: jobmaxage,
      gender: jobgenderpref,
      job_salary: jobsalary,
      job_application_deadline: jobappxndeadline,
      advance_listing: jobadvncelisting,
      job_type: jobtype,
      job_education_specialization: jobspec,
    });
    await jobListing.save();
    res.status(200).json({
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
