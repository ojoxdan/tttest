const express = require("express");
const { check, validationResult } = require("express-validator");
const config = require("config");
const router = express.Router();
const authUser = require("../../../auth/authUser");
const JobListingModel = require("../../../../database/models/seller/my-product/JobListingModel");

router.get('/',authUser, async(req, res)=>{
  return res.json({msg:"ok"})
})

module.exports = router;
