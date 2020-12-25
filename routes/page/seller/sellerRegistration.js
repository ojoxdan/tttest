const fs = require('fs')
const path = require('path')
const express = require('express')
const router =  express.Router()
const {check, validationResult} = require('express-validator')

const SellerRegistrationModel = require('../../../database/models/seller/SellerRegistrationModel')


// @route:          /api/seller/register
// @description:    Tinkoko seller's registraino enpoint
// @access:         Private 
router.post('/',
 [
     check('sid', 'Please enter a valid seller id').not().isEmpty(),
     check('sfn', 'Please enter your full name').not().isEmpty(),
     check('sdob', 'Please enter your date of birth').not().isEmpty(),
     check('scor', 'Please enter your country of residence').not().isEmpty()
 ],
 async(req, res)=>{
     let errors = validationResult(req)
     if (!errors.isEmpty()) {
         return res.status(400).json({error: errors.array()})
        }
        
    if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({msg: 'Please upload valid credentials'})
        }
        if (await SellerRegistrationModel.findOne({sellerId:req.body.sid})) {
            return res.status(400).json({msg: 'Sorry this user has already requested for a seller account'})
        }

        let randomNumber = Math.ceil(parseInt(Date.now()) * Math.random());
        let sid = await req.body.sid
   
        try {
       
           //  uplodad seller identification image 
           let sidi = req.files.sidi
           let idpath = 'assets/seller/sellers-id-image/id-image-'+sid+'-'+randomNumber+'-'+sidi.name
           await sidi.mv(idpath, (err)=>{
                if (err) {
                    console.error(err)
                    return res.status(500).json({msg:"server error"})
                }
                return true
            })
       
           //  uplodad seller cac image 
            let scaci = req.files.scaci
            let cacpath = 'assets/seller/sellers-cac-image/cac-image-'+sid+'-'+randomNumber+'-'+scaci.name 
            await scaci.mv(cacpath, (err)=>{
                if (err) {
                    console.error(err)
                    return res.status(500).json({msg:"server error"})
                }
                return true
            })
       
            let seller = new SellerRegistrationModel({
                sellerId: req.body.sid,
                fullName: req.body.sfn,
                dateOfBirth: req.body.sdob,
                countryOfResidence: req.body.scor,
                identificationImage: idpath,
                CACImage: cacpath
            })
            await seller.save();
            res.status(200).json({msg: 'Membership Verification Request Submitted'})
        } catch (error) {
            res.status(500).json({error: 'server error'})
        }

})

module.exports = router