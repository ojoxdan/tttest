const express = require("express");
const authUser = require("../../../auth/authUser");
const TransactionsHistoryModel = require("../../../../database/models/seller/TransactionsHistoryModel");
const router = express.Router();

router.get("/history", authUser, async (req, res) => {
  try {
    let acctHistory =  await TransactionsHistoryModel.find({
        user:req.user.user.id
    })
    return res.json({success:acctHistory})
  } catch (err) {
      console.log(err)
      res.json({error:{msg:"Server Error"}})
      process.exit()
  }
});
module.exports = router;
