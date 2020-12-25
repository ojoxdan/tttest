const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const authUser = require("../../../auth/authUser");
const UsersModel = require("../../../../database/models/public/UsersModel");
const { check, validationResult } = require("express-validator");
const PostModel = require("../../../../database/models/seller/my-product/PostModel");
const OrderModel = require("../../../../database/models/buyer/OrderModel");
const ioSocket = require("../../../../server");
const NotificationModel = require("../../../../database/models/public/NotificationModel");

// ioSocket.notifyUser()
const checker = [
  // authUser,
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
    check(
      "bemail",
      "Please enter the Address you are ordering this product to "
    )
      .not()
      .isEmpty(),
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
  //   const id = req.user.user.id;
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
  let allOrders = [];
  let orderTotalPrice = 0;
  try {
    let totalamount = 0;
    let cartid = uuid.v4();
    let trackingNumber = uuid.v4().small();
    const getAllOrders = async (order, product) => {
      allOrders.push({
        product_id: order.id,
        seller_id: product.post_author,
        // buyer_id,
        buyer_first_name: bfn,
        buyer_last_name: bln,
        buyer_phone: bphone,
        buyer_address: baddr,
        buyer_email: bemail,
        buyer_city: bcity,
        buyer_state: bstate,
        buyer_country: bcountry,
        // quantity,
        shipping_duration: product.shipping_duration,
        shipping_method: product.shipping,
        // price,
        total_price: order.price,
        payment_method: product.payment_method,
        cart_id: cartid,
        tracking_number:trackingNumber
        // payment_status,
        // order_status,
        // date_placed,
        // date_delivered,
      });
    };
    // order function to fetch all orders from the request body
    let newArr = [];
    let num = 0;
    if (orders) {
      if (JSON.parse(orders)) {
        let o = JSON.parse(orders);
        for (let i = 0; i < o.length; i++) {
          let order = o[i];
          const product = await PostModel.findOne({
            _id: o[i].id,
          });
          if (!product) {
            return res.json({ error: { msg: "Product Not Found" } });
          }
          if (parseInt(product.post_price) === parseInt(order.price)) {
            totalamount = totalamount + parseInt(order.price);
            getAllOrders(o[i], product);
          }
        }
      }
    }
    if (ototal < orderTotalPrice) {
      return res.json({
        error: { msg: "Sorry insufficient ammount to clear your cart" },
      });
    }
    await OrderModel.insertMany(allOrders, async (err, data) => {
      if (err) {
        console.log(err, "the order insertion error");
        return res.json({ error: { msg: "Server Error" } });
      } else if (data) {
        // Notification Message starts here
        for (let i = 0; i < allOrders.length; i++) {
          let u = allOrders[i];
          let sender = {
            userType: "buyer",
            id: "3384839393kc",
            message: "New Order Created",
          };
          console.log(u, " the user id here ");
          let receiver = {
            userType: "seller",
            id: u.post_author,
          };
          let newNote = new NotificationModel({
            type: "order",
            message:
              "New notification has been submitted by a new buyere with id xxxx ",
            receiverId: u.post_author,
          });
          newNote.save();
          if (sender && receiver) {
            ioSocket.notifyUser(sender, receiver);
          }
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
router.get("/", async (req, res) => {
  try {
    let orders = await OrderModel.find();
    if (!orders)
      return res.json({
        success: {
          msg:
            "Sorry, it looks like you have not placed any order, place one today",
        },
      });
    let pids = [];
    for (let i = 0; i < orders.length; i++) {
      let o = orders[i];
      if (o.product_id) {
        pids.push(o.product_id);
      }
    }
    let newOrders = await OrderModel.aggregate([
      {
        $lookup: {
          from: "tkk_posts",
          localField: "product_id",
          foreignField: "post_id",
          as: "post",
        },
      },
    ]);
    res.json({ success: newOrders });
  } catch (err) {
    console.log(err.message);
    res.json({ error: "Server Error" });
  }
});

// @GET  METHOD SINGLE ORDER BY  ALL ORDERS BY A USER
router.get("/:orderid", async (req, res) => {
  try {
    let order = await OrderModel.aggregate([
      {
        $lookup: {
          from: "tkk_posts",
          localField: "product_id",
          foreignField: "post_id",
          as: "post",
        },
      },
      {$match : { cart_id : req.params.orderid }}
    ]);
    res.json({ success: order });
  } catch (err) {
    console.log(err.message);
    res.json({ error: "Server Error" });
  }
});
// @GET  METHOD SINGLE ORDER BY  ALL ORDERS BY A USER
router.get("/:orderid/:productid", async (req, res) => {
  console.log(req.params.productid, " this is the product id ")
  try {
    let order = await OrderModel.aggregate([
      {
        $lookup: {
          from: "tkk_posts",
          localField: "product_id",
          foreignField: "post_id",
          as: "post",
        },
      },
      {$match : { order_status : "delivered" }},
      {$match : { product_id : req.params.productid }}
    ]);
    console.log(order , " this is")
    res.json({ success: order });
  } catch (err) {
    console.log(err.message);
    res.json({ error: "Server Error" });
  }
});

module.exports = router;
// productId
// productSellerId
// productSellerName
// buyerId
// orderQuantity
// pricePerProduct
// totalPrice
// paymentMethod
// paymentStatus

// product_id
// seller_id
// buyer_id
// buyer_first_name
// buyer_last_name
// buyer_phone
// buyer_address
// buyer_email
// buyer_city
// buyer_state
// buyer_country
// quantity
// shipping_duration
// shipping_method
// shipping_cost
// price
// total_price
// payment_method
// payment_status
// order_status
// date_placed
// date_delivered
