const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const router = express.Router();
const UsersModel = require("../../../database/models/public/UsersModel");

//@Route                    /api/register
//@description              register a new tinkoko user (buyer or seller)
// acess                    public

router.post(
  "/",
  [
    check("fname", "Please enter your first name").not().isEmpty(),
    check("lname", "Please enter your last name").not().isEmpty(),
    check("phone", "Please enter your phone number").not().isEmpty(),
    check("utype", "Please select a user type").not().isEmpty(),
    check("pwd", "Please enter password, with at least 6 charracters")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("cpwd", "Please confirm your password")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("email", "Please enter your email address").not().isEmpty().isEmail(),
    check("cemail", "Please confirm your email address")
      .not()
      .isEmpty()
      .isEmail(),
    check("bname", "Please enter your Business name").not().isEmpty(),
    check("baddress", "Please enter your Business address").not().isEmpty(),
    check("city", "Please enter your city").not().isEmpty(),
    check("state", "Please enter your state").not().isEmpty(),
    check("country", "Please enter your country").not().isEmpty(),
    check("terms", "To Register with us you have agree to our terms of service")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    // return error if not validated
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    if (req.body.pwd !== req.body.cpwd) {
      return res
        .status(400)
        .json({ error: { msg: "Please make sure your password match" } });
    }
    if (req.body.email !== req.body.cemail) {
      return res
        .status(400)
        .json({ error: { msg: "Please make sure your email match" } });
    }

    try {
      // check if user with the email address already exist
      if (await UsersModel.findOne({ email: req.body.email })) {
        return res
          .status(400)
          .json({
            error: { msg: "sorry user with email address already exist" },
          });
      }
      let user = new UsersModel({
        firstName: req.body.fname,
        lastName: req.body.lname,
        phone: req.body.phone,
        userType: req.body.utype,
        password: req.body.pwd,
        email: req.body.email,
        businessName: req.body.bname,
        businessAddress: req.body.baddress,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
      });
      // has password with bcryt js
      let salt = await bcrypt.genSalt(10);
      // return console.log(req.body)
      user.password = await bcrypt.hash(req.body.pwd, salt);
      await user.save();
      let userDetail = await UsersModel.findOne({
        email: req.body.email,
      }).select("-password");
      let payload = {
        user: {
          ...userDetail,
        },
      };

      // sign user token with jwt
      jwt.sign(
        payload,
        config.get("TKK_USER_SECRET"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) {
            return res
              .status(401)
              .json({ error: err + " User Not Authenticated" });
          }

          return res
            .status(200)
            .json({
              success: "You have been successfully authenticated",
              token,
            });
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
);

module.exports = router;
