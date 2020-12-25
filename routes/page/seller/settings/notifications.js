const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authUser = require("../../../auth/authUser");
const UsersModel = require("../../../../database/models/public/UsersModel");
const NotificationModel = require("../../../../database/models/admin/NotificationModel__");
const { findOne } = require("../../../../database/models/public/UsersModel");

const checker = [
  authUser,
  [check("notify", "No Notification option has been selected")],
];
router.post("/", authUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array() });
  }
  let id = req.user.user.id;
  let { notify } = req.body;
  let user = await UsersModel.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ error: { msg: "User Not Found" } });
  }

  try {
    let cn = await NotificationModel.findOne({ _id: notify });
    if (!cn) {
      return res
        .status(404)
        .json({ error: { msg: `No Notification Option with id ${notify}` } });
    }
    await UsersModel.updateOne(
      { _id: id },
      {
        $set: {
          notificationOptions: [...user.notificationOptions, notify],
        },
      }
    );
    return res
      .status(200)
      .json({
        success: {
          msg: await findOne({ _id: id }).select("notificationOptions"),
        },
      });
  } catch (error) {
    return res.status(500).json({ error: { msg: "Server Error" } });
  }
});

router.delete("/:infoid", authUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array() });
  }
  let id = req.user.user.id;
  let { infoid } = req.params;

  let user = await UsersModel.findOne({ _id: id }).select(
    "notificationOptions"
  );
  if (!user) {
    return res.status(404).json({ error: { msg: "User Not Found" } });
  }

  let newNotificationOptions = [];
  let optNotify = user.notificationOptions;
  if (optNotify.some((note) => note === infoid)) {
    newNotificationOptions = optNotify.filter((n) => n !== infoid);
  } else {
    return res
      .status(404)
      .json({ error: { msg: `No Notification with id ${notify[i]}` } });
  }

  try {
    await UsersModel.updateOne(
      { _id: id },
      {
        $set: {
          notificationOptions: newNotificationOptions,
        },
      }
    );
    return res
      .status(200)
      .json({
        success: {
          msg: await findOne({ _id: id }).select("notificationOptions"),
        },
      });
  } catch (error) {
    return res.status(500).json({ error: { msg: "Server Error" } });
  }
});
module.exports = router;
