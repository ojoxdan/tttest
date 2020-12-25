const mongoose = require("mongoose");

const Notification = mongoose.Schema({
  type: {
    type: String,
    require: true,
    default: null,
  },
  message: {
    type: String,
    require: true,
    default: null,
  },
  senderId: {
    type: String,
    require: true,
    default: null,
  },
  receiverId: {
    type: String,
    require: true,
    default: null,
  },
  status: {
    type: String,
    require: true,
    default: "unread",
  },
  dateCreated: {
    type: Date,
    require: true,
    default: Date.now,
  }
});

module.exports = mongoose.model("tkk_notifications", Notification);
