const mongoose = require("mongoose");

const Posts = mongoose.Schema({
  post_author: {
    type: String,
    require: true,
  },
  promoted:{
    type:Boolean, 
    require:false
  },
  post_id: { 
    // type: mongoose.Schema.ObjectId, 
    type: String, 
     required: true
     },
  post_category: {
    type: String,
    require: true,
  },
  post_subcategory: {
    type: String,
    require: true,
  },
  post_images: {
    type: Array,
    require: true,
  },
  post_video: {
    type: String,
    default:null,
  },
  post_region: {
    type: String,
    require: true,
  },
  post_country: {
    type: String,
    require: true,
  },
  post_title: {
    type: String,
    require: true,
  },
  post_url: {
    type: String,
    require: true,
  },
  post_description: {
    type: String,
    require: true,
  },
  post_author_contact: {
    type: Boolean,
    require: false,
  },
  post_negotiable: {
    type: Boolean,
    require: false,
  },
  shipping_cost: {
    type: Number,
    require: true,
    default:0
  },
  shipping_duration: {
    type: String,
    require: true,
  },
  shipping_method: {
    type: String,
    require: true,
  },
  paymenth_method: {
    type: String,
    require: true,
  },
  Voucher_discount: {
    type: String,
  },
  post_price: {
    type: String,
    require: true,
  },
  post_distribution: {
    type: String,
    require: true,
  },
  post_author_phone: {
    type: String,
    require: true,
  },
  post_author_name: {
    type: String,
    require: true,
  },
  post_author_company: {
    type: String,
    require: true,
  },
  product_dropoff_location: {
    type: String,
    require: true,
  },
  post_date: {
    type: Date,
    default: Date.now(),
  },
  post_likes: {
    type: Array,
    require: [],
  },
  post_views: {
    type: Number,
    require: 0,
  },
  ads_views:{
    type:Number,
    default:0,
    required:true
  },
  chats:{
    type:Array,
    default:[],
    required:true
  },
  post_type: {
    type: String,
    require: true,
  },
  business_industry: {
    type: String,
    require: true,
  },
  business_function: {
    type: String,
    require: true,
  },
  job_role: {
    type: String,
    require: true,
  },
  job_qualification: {
    type: String,
    require: true,
  },
  years_of_experience: {
    type: String,
    require: true,
  },
  skills: {
    type: String,
    require: true,
  },
  max_age: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  job_salary: {
    type: String,
    require: true,
  },
  job_application_deadline: {
    type: String,
    require: true,
  },
  advance_listing: {
    type: String,
    require: true,
  },
  job_type: {
    type: String,
    require: true,
  },
  job_education_specialization: {
    type: String,
    require: true,
  },
  post_reviews: {
    type: Number,
    require: true,
  },
  post_stars: {
    type: Number,
    require: true,
  },
  one_stars:{
    type: Number,
    required: true,
    default:0
  },
  two_stars:{
    type: Number,
    required: true,
    default:0
  },
  three_stars:{
    type: Number,
    required: true,
    default:0
  },
  four_stars:{
    type: Number,
    required: true,
    default:0
  },
  five_stars:{
    type: Number,
    required: true,
    default:0
  },
  promoted_post:{
    type:Boolean,
    default:false
  },
  approved_post:{
    type:Boolean,
    default:false
  },
  approved_promotion:{
    type:Boolean,
    default:false
  },
  post_status:{
    type:String,
    default:"pending",
    required:true
  }
});

module.exports = mongoose.model("tkk_posts", Posts);

// jobSellerId
// jobCategory
// jobSubCategory
// jobImage
// jobRegion
// jobTitle
// jobDescription
// jobBusinessIndustry
// jobType
// jobBusinessFunction
// jobRole
// jobMinQualification
// jobYearsOfExp
// jobEduSpecialization
// jobSkills
// jobMaxAge
// jobGenderPref
// jobSalary
// jobApplicationDeadline
// jobAdvanceListing
