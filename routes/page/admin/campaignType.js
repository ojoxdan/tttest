const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const CampaignTypesModel = require('../../../database/models/admin/CampaignTypesModel')

const checker = [
    authUser,
    [
        check('ctname','Please enter the campaign type Name').not().isEmpty(),
        check('ctprice','Please enter the campaign type Price').not().isEmpty(),
        check('ctimgwidth','Please enter the campaign type Image Width').not().isEmpty(),
        check('ctimgheight','Please enter the campaign type Image Height').not().isEmpty()
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    const {ctname,ctprice,ctimgwidth,ctimgheight} = req.body
    let inputExist =  await CampaignTypesModel.findOne({name:ctname})
    if (inputExist) {
        return res.status(400).json({error:{msg:"Sorry ths Campaign Type already exist"}})
    }
    const campaignType =  new CampaignTypesModel({
        name:ctname,
        price:ctprice,
        imageWidth:ctimgwidth,
        imageHeight:ctimgheight,
    })
    await campaignType.save();
    return res.status(200).json({success:{msg:'New campaign type added successfully'}})

})
module.exports = router

// name
// price
// imageWidth
// imageHeight