const express = require("express");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/emailSender");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const UsersModel = require("../../../database/models/public/UsersModel");
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYnV5bm93QGdtYWlsLmNvbSIsImlkIjoiNWY3OTgzNTQ4MjE5MTQzMzgwYmJjOTgzIiwidXNlclR5cGUiOiJidXllciJ9LCJpYXQiOjE2MDg0NTc0OTQsImV4cCI6MTYxMjA1NzQ5NH0.8tGcjdF8k3U4HQSJj8TirdXCRPwwg3424Z35jQJl88E

router.post(
  "/",
  [check("uemail", "Please enter a valid email").not().isEmpty().isEmail()],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      let user = await UsersModel.findOne({ email: req.body.uemail });
      if (user) {
        payload = {
          user: {
            email: user.email,
            id: user.id,
            userType: user.userType,
          },
        };
        jwt.sign(
          payload,
          config.get("TKK_FORGOTTEN_PASSOWORD"),
          { expiresIn: 3600000 },
          async (err, token) => {
            if (err) {
              return res.json({ msg: "Bad Authentication" });
            }
            await UsersModel.updateOne(
              { email: user.email },
              {
                retrievePassword: token,
              }
            ).then((data) => {
              if (data) {
                // sendEmail({
                //     to:"ojoxdan@gmail.com",
                //     // to:user.email,
                //     subject:"Tinkoko email retreival",
                //     text:`click on this http://localhost:3002/forgotton-password/${token} link to complete your account password retrieval process at tinkoko.com`
                // })
                return res.status(200).json({
                  success: {
                    msg:
                      "You have been sent an email, follow te link to complete your password retrieval",
                    token,
                  },
                });
              }
            });
          }
        );
      } else {
        return res
          .status(200)
          .json({ error: { msg: "Wrong User Credential" } });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: { msg: "Server Error" } });
    }
  }
);

module.exports = router;
