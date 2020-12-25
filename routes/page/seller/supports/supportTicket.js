const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authUser = require("../../../auth/authUser");
const SupportTicketModel = require("../../../../database/models/seller/support/SupportTicketModel");
const UsersModel = require("../../../../database/models/public/UsersModel");

const checker = [
  authUser,
  [
    check("reason", "Please select support reason").not().isEmpty(),
    check("comment", "Sorry the comment can not be empty").not().isEmpty(),
  ],
];
router.post("/open-ticket", [...checker], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: { msg: errors.array() } });
  }

  try {
    let userid = req.user.user.id;
    let user = await UsersModel.findOne({ _id: userid });

    if (!user) {
      return res.status(400).json({ error: { msg: "Bad Authentication" } });
    }
    const { reason, comment } = req.body;
    let screenshots;
    let totalTickets = await SupportTicketModel.find();
    let ticket_number = Date.now();
    ticket_number = Math.round(ticket_number / 2000 + totalTickets.length);
    let screenshotImages = [];
    // Support screen shot
    const uploadScreenShotImage = (file) => {
      let imgPath =
        "assets/seller/support-images/support-img-" + file.md5 + file.name;
      screenshotImages.push(imgPath);

      file.mv(imgPath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "server error" });
        }
      });
    };

    if (req.files) {
      let imgFile = req.files.screenshots;
      if (imgFile) {
        screenshots = imgFile;
        if (screenshots) {
          if (Object.keys(screenshots)) {
            if (screenshots.hasOwnProperty("name")) {
              uploadScreenShotImage(screenshots);
            } else if (Object.keys(screenshots).length > 2) {
              screenshots.forEach((file) => uploadScreenShotImage(file));
            }
          }
        }
      }
    }
    let supportTicket = new SupportTicketModel({
      user_id: userid,
      reason,
      comment,
      screenshots: screenshotImages,
      status: "open",
      ticket_number,
    });
    await supportTicket.save();

    let supports = await SupportTicketModel.findOne({ userId: userid });
    res.status(200).json({ success: { msg: "Support ticket submitted " } });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: { msg: "Server Error" } });
  }
});


router.get("/", authUser, async(req, res)=>{
    let user = req.user.user
    try {
        const supports = await SupportTicketModel.find({user_id:user.id})
        if (supports) return res.json({success:supports})
    } catch (err) {
        console.log(err)
        return res.json({error:{msg:"Server Error"}})
    }
})
module.exports = router;
