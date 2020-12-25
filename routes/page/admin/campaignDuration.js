const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authUser = require('../../auth/authUser')
const CampaignDurationModel = require('../../../database/models/admin/CampaignDurationModel')

const checker = [
    authUser,
    [
        check('ctduration','Please enter the campaign Duration').not().isEmpty(),
        // check('ctduration','The campaign Duration has to be in number of days - add number').not().isNumeric()
    ]
]
router.post('/',[...checker], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }

    const {ctduration} = req.body
    let inputExist =  await CampaignDurationModel.findOne({days:ctduration})
    if (inputExist) {
        return res.status(400).json({error:{msg:"Sorry ths Campaign Duration already exist"}})
    }
    const campaignduration =  new CampaignDurationModel({
        days:ctduration,
    })
    await campaignduration.save();
    return res.status(200).json({success:{msg:'New campaign Duration added successfully'}})

})

router.get("/",  async(req, res)=>{
    const durations = await CampaignDurationModel.find()
    res.json({success: durations})
})
module.exports = router

// days
