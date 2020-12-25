const express = require("express");
const uuid = require("uuid");
const mongoose = require("mongoose");
const router = express.Router();
const authUser = require("../../../auth/authUser");
const UsersModel = require("../../../../database/models/public/UsersModel");
const { check, validationResult } = require("express-validator");
const PostModel = require("../../../../database/models/seller/my-product/PostModel");
const OrderModel = require("../../../../database/models/buyer/OrderModel");
const ioSocket = require("../../../../server");
const NotificationModel = require("../../../../database/models/public/NotificationModel");

router.post("/confirm", authUser, async (req, res) => {
  try {
      return console.log(req.body.orderid, " the order id to confirm ")
      let user = req.user.user
      let order =  OrderModel.findOneAndUpdate({_id:req.body.orderid},{
          status:"confirmed",
          history: {$push: {
              date:Date.now(),
              note:"order confirmed",

          }}
      })
      if (order) {
        let buyer = order.buyer_id;
        let seller = user.id;
        let receiver = {
          userType: "buyer",
          id: buyer,
          message: `Your order ${order._id} has been confirmed`,
        };
        let sender = {
          userType: "seller",
          id: seller,
          message: `You confirmed order ${u._id} `,
        };

        let toReceiver = new NotificationModel({
          type: "order",
          reciever: buyer,
          status: "new",
          message: `Your order ${u._id} has been confirmed by seller`,
          sender: seller,
        });
        toReceiver.save();
        let toSender = new NotificationModel({
          type: "order",
          reciever: seller,
          status: "new",
          message: `You have confirmed order ${u._id}`,
          sender: buyer,
        });
        toSender.save();
        if (sender && receiver) {
          ioSocket.notifyUser(sender, receiver);
          ioSocket.notifyUser(receiver, sender);
        }
      }
      res.json(order)
  } catch (error) {
    console.error(error);
    return res.json({ error: { msg: "Server Error" } });
  }
});
