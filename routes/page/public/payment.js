const express = require("express");
const router = express.Router();
let paystack = require("paystack")(
  "sk_test_5a9eeb39ea6b900406ee521ca423bc9c57df4c62"
);
const authUser = require("../../auth/authUser");
const ioSocket = require("../../../server");
const PostModel = require("../../../database/models/seller/my-product/PostModel");
const OrderModel = require("../../../database/models/buyer/OrderModel");
const NotificationModel = require("../../../database/models/public/NotificationModel");
const ReferenceModel = require("../../../database/models/public/ReferenceModel");
const { jwt } = require("../../../server");

const TKKModel = {
    order:{Model:OrderModel, redirect_url:"http://localhost:3002/checkout"}
}

router.get("/success", async (req, res) => {
  try {
    console.log(req.query);
    if (req.query.reference) {
      let paid = await paystack.transaction.verify(req.query.reference);
      if (paid.data) {
         await OrderModel.updateMany(
          {
            payment_reference: req.query.reference,
          },
          { order_status: "completed" }
        );
        let ref = await ReferenceModel.findOne({
            reference: req.query.reference,
        });
        if (ref) {
            let TM = TKKModel[ref.data_model]
            if (TM) {
               let refData = await TM.Model.find({
                    payment_reference:req.query.reference
                })
                if (TM.redirect_url) {
                    let payload = {
                        data:refData
                    }
                    let msg = {
                        data:{
                            status:true,
                            message:"Payment completed successfully"
                        }
                    }
                    return res.redirect(`${TM.redirect_url}/${jwt.sign(payload,"tinkokoclientside")}/${jwt.sign(msg,"tinkokoclientside")}`) 
                }
                return res.json({error:"server Error"})
            }
        }
        
        res.redirect(`${jwt.sign(TM)}`)
        // return res.json({ order });
      } else {
        return res.json({ data: paid });
      }
    }
    res.json({ data: req.query });
  } catch (error) {
    console.error(error);
    return res.json({ error: { msg: "Server Error try again " } });
  }
});
module.exports = router;
