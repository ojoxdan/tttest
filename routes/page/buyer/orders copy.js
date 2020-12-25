const express = require("express");
const uuid = require("uuid");
const paystact = require("paystack");
const mongoose = require("mongoose");
const router = express.Router();
const authUser = require("../../auth/authUser");
const UsersModel = require("../../../database/models/public/UsersModel");
const { check, validationResult } = require("express-validator");
const PostModel = require("../../../database/models/seller/my-product/PostModel");
const OrderModel = require("../../../database/models/buyer/OrderModel");
const ioSocket = require("../../../server");
const NotificationModel = require("../../../database/models/public/NotificationModel");
const TransactionsHistoryModel = require("../../../database/models/seller/TransactionsHistoryModel");
const ReviewModel = require("../../../database/models/buyer/ReviewModel");
const paymentGateway = require("../../../payment-gateway/paymentGateway");

// ioSocket.notifyUser()
const checker = [
  authUser,
  [
    check(
      "orders",
      "Sorry you can not order an empty cart, add some product to your basket and reorder"
    )
      .not()
      .isEmpty(),
    check("paymethod", "Please select a payment method ").not().isEmpty(),
    check("ototal", "Please enter the total amount").not().isEmpty(),
    check("bfn", "Please enter your First Name ").not().isEmpty(),
    check("bln", "Please enter your Last Name ").not().isEmpty(),
    check("bphone", "Please enter your Phone Number").not().isEmpty(),
    check("baddr", "Please enter the Address you are ordering this product to ")
      .not()
      .isEmpty(),
    check("bemail", "Please enter your email address  ").isEmail(),
    check("bcity", "Please enter the City you are ordering this product to ")
      .not()
      .isEmpty(),
    check("bstate", "Please enter the State you are ordering this product to ")
      .not()
      .isEmpty(),
    check(
      "bcountry",
      "Please enter the Country you are ordering this product to "
    )
      .not()
      .isEmpty(),
  ],
];

router.post("/", [...checker], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array() });
  }
  const buyer_id = req.user.user.id;
  const {
    paymethod,
    bfn,
    bln,
    bphone,
    baddr,
    bcity,
    bstate,
    bcountry,
    ototal,
    orders,
    bemail,
  } = req.body;
  // create bulk order
  let orderTotalPrice = 0;
  try {
    let totalamount = 0;
    let cartid = uuid.v4();
    let validInfo = {
      buyer_id,
      buyer_first_name: bfn,
      buyer_last_name: bln,
      buyer_phone: bphone,
      buyer_address: baddr,
      buyer_email: bemail,
      buyer_city: bcity,
      buyer_state: bstate,
      buyer_country: bcountry,
      cart_id: cartid,
    };
    let myOrders = {};
    if (orders) {
      if (JSON.parse(orders)) {
        let o = JSON.parse(orders);
        for (let i = 0; i < o.length; i++) {
          let order = o[i];
          const product = await PostModel.findOne({
            _id: o[i].id,
          });
          if (!product) {
            return res.json({
              error: { msg: `Product with id ${o[i].id} Not Found` },
            });
          }
          if (parseInt(product.post_price) === parseInt(order.price)) {
            totalamount = totalamount + parseInt(order.price);
            if (
              myOrders[product.post_author] &&
              Array.isArray(myOrders[product.post_author])
            ) {
              myOrders[product.post_author] = [
                ...myOrders[product.post_author],
                product,
              ];
            } else {
              myOrders[product.post_author] = [product];
            }
          }
        }
      }
    }
    if (ototal < orderTotalPrice) {
      return res.json({
        error: { msg: "Sorry insufficient ammount to clear your cart" },
      });
    }

    let cos = Object.entries(myOrders);
    let insertingOrders = [];

    // seller_id: product.post_author,
    // shipping_duration: product.shipping_duration,
    // shipping_method: product.shipping,
    // total_price: order.price,
    // payment_method: product.payment_method,
    // paymethod,
    // bfn,
    // bln,
    // bphone,
    // baddr,
    // bcity,
    // bstate,
    // bcountry,
    // ototal,
    // orders,
    // bemail,

    let paid = await paymentGateway({
      name: `${bfn} ${bln}`,
      email: bemail,
      amount: ototal,
    });

    let payment_reference;
    let authorization_url;
    let access_code;
    if (paid) {
      if (paid.data) {
        payment_reference = paid.data.access_code;
        authorization_url = paid.data.authorization_url;
        access_code = paid.data.access_code;
      }
    }
    //     if (!paid && !paid.data)
    //       return res.json({ error: { msg: "Server Error" } });

    // console.log("i did not get to this place ")
    await (async () => {
      for (let i = 0; i < cos.length; i++) {
        let o = cos[i];
        insertingOrders.push({
          seller_id: o[0],
          ...validInfo,
          items: o[1],
          tracking_number: uuid.v4(),
          payment_method: "Online Payment Method",
          payment_stutus: "pending",
          payment_reference,
          access_code,
          shipping_method: "Tinkoko Logistics",
          total_price: totalamount,
        });
      }
    })();
    console.log(insertingOrders, " all the inserting orders here ")

    // ***** the total amount paid by the byuyer need to be equl the totalamount variable to proceed ****
    // ************************* payment gateway runs here before proceeding *****************************

    // return console.log(insertingOrders, " all the order in here");

   let insertedOrder  = await OrderModel.insertMany(insertingOrders, async (err, data) => {
      if (err) {
        console.log(err, "the order insertion error");
        return res.json({ error: { msg: "Server Error" } });
      } else if (data) {
        // Notification Message starts here
        for (let i = 0; i < data.length; i++) {
          let u = data[i];
          let sender = {
            userType: "buyer",
            id: u.buyer_id,
            message: `You have a new order with id ${u._id}`,
          };
          let receiver = {
            userType: "seller",
            id: u.seller_id,
            message: `New order with id ${u._id} has been placed`,
          };

          let toReceiver = new NotificationModel({
            type: "order",
            reciever: u.seller_id,
            status: "new",
            message: `New order with id ${u._id} has been placed`,
            sender: u.buyer_id,
          });
          toReceiver.save();
          let toSender = new NotificationModel({
            type: "order",
            reciever: u.buyer_id,
            status: "new",
            message: `Your order with id ${u._id} has been placed successfully`,
            sender: u.seller_id,
          });
          toSender.save();
          if (sender && receiver) {
            ioSocket.notifyUser(sender, receiver);
            ioSocket.notifyUser(receiver, sender);
          }

          console.log(paid, " all the inserted await  ")
          console.log(insertedOrder, " all the inserted order ")

          let txn = new TransactionsHistoryModel({
            user: u.seller_id,
            description: `An order worth of ${u.total_price} has been placed`,
            date: Date.now(),
            status: "completed",
            amount: u.total_price,
            transaction_type: "order",
          });
          txn.save();
          await UsersModel.updateOne(
            {
              _id: u.seller_id,
            },
            {
              $inc: { wallet: parseInt(u.total_price) },
            },
            { upsert: true }
          );
        }
        // Notification Message starts here
        return res.status(200).json({ success: data });
      }
    });
  } catch (error) {
    console.error(error);
    return res.json({ error: { msg: "Server Error" } });
  }
});

// @GET  METHOD FOR ALL ORDERS BY A USER
router.get("/", authUser, async (req, res) => {
  try {
    let user = req.user.user;
    let findQuery = {};
    if (user.userTpe === "seller") {
      findQuery.seller_id = user.id;
    } else if (user.userTpe === "buyer") {
      findQuery.buyer_id = user.id;
    }
    if (req.query.status) {
      findQuery.order_status = req.query.status;
    }
    if (!findQuery) return res.json({ error: { msg: "Bad Request" } });
    let orders = await OrderModel.find(findQuery);
    if (!orders)
      return res.json({
        success: {
          msg: "Sorry, you have no such order",
        },
      });
    res.json({ success: orders });
  } catch (err) {
    console.log(err.message);
    res.json({ error: "Server Error" });
  }
});

// @GET  METHOD SINGLE ORDER BY  ALL ORDERS BY A USER
router.get("/:orderid", authUser, async (req, res) => {
  try {
    let user = req.user.user;
    let findQuery = {};
    if (user.userType === "seller") {
      findQuery.seller_id = user.id;
    } else if (user.userType === "buyer") {
      findQuery.buyer_id = user.id;
    }
    findQuery._id = req.params.orderid;
    if (!findQuery) return res.json({ error: { msg: "Bad Request" } });
    let orders = await OrderModel.findOne(findQuery);
    if (!orders)
      return res.json({
        success: {
          msg: "Sorry, you have no such order",
        },
      });
    res.json({ success: orders });
  } catch (err) {
    console.log(err.message);
    res.json({ error: "Server Error" });
  }
});
// @GET  METHOD SINGLE ORDER BY  ALL ORDERS BY A USER
router.get("/:orderid/:productid", authUser, async (req, res) => {
  console.log(req.params.productid, " this is the product id ");
  let user = req.user.user;
  try {
    let isReviewed = await ReviewModel.findOne({
      post_id: req.params.productid,
      user_id: user.id,
    });
    if (isReviewed)
      return res.json({
        error: { msg: "Sorry you can review this product twice" },
      });
    let order = await PostModel.findOne({
      _id: req.params.productid,
      post_author: user.id,
    });
    res.json({ success: order });
  } catch (err) {
    console.log(err.message);
    res.json({ error: "Server Error" });
  }
});

router.post("/confirm", authUser, async (req, res) => {
  try {
    let user = req.user.user;
    let order = await OrderModel.findOneAndUpdate(
      { _id: req.body.orderid },
      {
        order_status: "confirmed",
        $push: {
          history: {
            date: Date.now(),
            note: "order confirmed",
          },
        },
      }
    );
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
        message: `You confirmed order ${order._id} `,
      };

      let toReceiver = new NotificationModel({
        type: "order",
        reciever: buyer,
        status: "new",
        message: `Your order ${order._id} has been confirmed by seller`,
        sender: seller,
      });
      toReceiver.save();
      let toSender = new NotificationModel({
        type: "order",
        reciever: seller,
        status: "new",
        message: `You have confirmed order ${order._id}`,
        sender: buyer,
      });
      toSender.save();
      if (sender && receiver) {
        ioSocket.notifyUser(sender, receiver);
        ioSocket.notifyUser(receiver, sender);
      }
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    return res.json({ error: { msg: "Server Error" } });
  }
});

module.exports = router;
