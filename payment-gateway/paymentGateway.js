const express = require("express");
const router = express.Router();
let paystack = require("paystack")(
  "sk_test_5a9eeb39ea6b900406ee521ca423bc9c57df4c62"
);

const paymentGateway = async (
  detail = {
    key: null,
    amount: 0,
    email: null,
    name: null,
  }, completeRequest
) => {
  //   verify after payment
  // paystack.transaction.verify()
 let pp =  await paystack.transaction
    .initialize({
      key: "jsjsjsss",
      amount: detail.amount,
      name: detail.name,
      email: detail.email,
    })
completeRequest()
};
// router.get("/completed payment")

module.exports = paymentGateway;
