const express = require("express");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/emailSender");
const bcrypt = require("bcryptjs");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const UsersModel = require("../../../database/models/public/UsersModel");
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYnV5bm93QGdtYWlsLmNvbSIsImlkIjoiNWY3OTgzNTQ4MjE5MTQzMzgwYmJjOTgzIiwidXNlclR5cGUiOiJidXllciJ9LCJpYXQiOjE2MDg0NTc0OTQsImV4cCI6MTYxMjA1NzQ5NH0.8tGcjdF8k3U4HQSJj8TirdXCRPwwg3424Z35jQJl88E

router.post(
  "/user-detail",
  [
    check(
      "token",
      "Please make sure you are using the correct url sent to our mail"
    ),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }
    try {
      let userData = jwt.verify(
        req.body.token,
        config.get("TKK_FORGOTTEN_PASSOWORD")
      );
      if (!userData) return res.json({ error: { msg: "bad authentication" } });
      if (!userData.user)
        return res.json({ error: { msg: "bad authentication" } });
      let user = await UsersModel.findOne({
        email: userData.user.email,
        retrievePassword: req.body.token,
      });
      if (user) {
        return res.json({ success: { email: userData.user.email } });
      } else {
        return res
          .status(200)
          .json({ error: { msg: "Wrong User Credential" } });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: { msg: "Server Error" } });
    }
  }
);

router.post(
  "/",
  [
    check(
      "token",
      "Please make sure you are using the correct url sent to our mail"
    ),
    check("newpwd", "Please enter your new password"),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }
    try {
      let userData = jwt.verify(
        req.body.token,
        config.get("TKK_FORGOTTEN_PASSOWORD")
      );
      if (!userData) return res.json({ error: { msg: "Bad authentication" } });
      if (!userData.user)
        return res.json({ error: { msg: "bad authentication" } });
      let user = await UsersModel.findOne({
        email: userData.user.email,
        retrievePassword: req.body.token,
      });
      if (!user)
        return res.json({ error: { msg: " Bad user authentication" } });
      let salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(req.body.newpwd, salt);
      let userUpdated = await UsersModel.updateOne(
        {
          email: userData.user.email,
          retrievePassword: req.body.token,
        },
        {
          password,
          retrievePassword: null,
        }
      );
      if (userUpdated) {
        // send email to user and
        let uuser = await UsersModel.findOne({
          email: userData.user.email,
          password,
        });
        if (uuser) {
          payload = {
            user: {
              id: uuser._id,
              userType: uuser.userType,
            },
          };
          jwt.sign(
            payload,
            config.get(`TKK_USER_SECRET`),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) {
                return res.status(401).json({ msg: "Bad Authentication" });
              }

              return res
                .status(200)
                .json({ success: { msg: "Authentication Successful", token } });
            }
          );
        } else {
          return res
            .status(200)
            .json({ error: { msg: "Wrong User Credential" } });
        }
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: { msg: "Server Error" } });
    }
  }
);

module.exports = router;
