const express = require('express')
const router = express.Router()
const {check,validationResult} = require('express-validator')
const UsersModel = require('../../../database/models/public/UsersModel')
const JobApplicationsModel = require('../../../database/models/buyer/JobApplicationsModel')
const authUser = require('../../auth/authUser')

const checker = [
    authUser,
    check('jobid', 'Please provide the job id ').not().isEmpty(),
    check('sid', 'Provide job provider\'s id  ').not().isEmpty(),
    check('appfn', 'Please enter your full name ').not().isEmpty(),
    check('appemail', 'Please enter your email address ').not().isEmpty(),
    check('appemail', 'Please enter a valid email address  ').isEmail(),
    check('appdob', 'Please enter your Date Of Birth').not().isEmpty(),
    check('applocation', 'Please specify your Location ').not().isEmpty(),
    check('appyoe', 'Please enter Years Of Experience ').not().isEmpty(),
    check('appcs', 'What is your Current Salary').not().isEmpty(),
    check('apphle', 'Enter your Highest Level Of Education').not().isEmpty(),
    check('appcbf', 'Enter your Current Business Function ').not().isEmpty(),
]
router.post('/',[...checker], async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }
    if (!req.files) {
        return res.status(400).json({error:{msg:'Please upload your CV '}})
    }
    let id = req.user.user.id
    const {jobid,sid,appfn,appemail,appdob,applocation,appyoe,appcs,apphle,appcbf} = req.body

    try {
        let user = await UsersModel.find({_id:id})
        if (!user) {
            return res.status(404).json({error:{msg:'User Not Found'}})
        }


        let seller = await UsersModel.findOne({_id:id})
        if (!seller) {
            return res.status(404).json({error:{msg:'Seller Not Found'}})
        }
        let job =  await JobApplicationsModel.findOne({_id:jobid})
        if (!job) {
            return res.status(404).json({error:{msg:'Sorry this job does not exist '}})
        }

        let cvpath 
        let {appcv} = req.files
        const uploadProductImage =  async(file)=>{
            let imgPath = 'assets/buyer/job-aplication-images/cv-img-'+file.md5+file.name
            cvpath = imgPath
            await file.mv(imgPath, (err)=>{
                if (err) {
                    console.error(err)
                    return res.status(500).json({msg:"server error"});
                }
            })
        }
        uploadProductImage(appcv)
        
            let newapplicant =  new JobApplicationsModel({
                jobId:jobid,
                sellerId:sid,
                buyerId:id,
                applicantFullName:appfn,
                applicantEmail:appemail,
                applicantDOB:appdob,
                applicantLocation:applocation,
                applicantYearsOfExperience:appyoe,
                applicantCurrentSalary:appcs,
                applicantHighestLevelEducation:apphle,
                applicantCurrentBusinessFunction:appcbf,
                applicantAttachedCV:cvpath
            })

            await newapplicant.save()

            res.status(200).json({success:{msg:"Your Application has been submitted successfully"}})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({msg:"Server Error"})
    }
})
module.exports = router

    // jobId
    // sellerId
    // buyerId
    // applicantFullName
    // applicantEmail
    // applicantDOB
    // applicantLocation
    // applicantYearsOfExperience
    // applicantCurrentSalary
    // applicantHighestLevelEducation
    // applicantCurrentBusinessFunction
    // applicantAttachedCV