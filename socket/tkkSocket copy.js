class TkkSocket {
  onlineUsers = {
    admin: {},
    buyer: {},
    seller: {},
  };
  constructor(io) {
    this.chatdb = require("../database/models/public/ChatModel");
    this.config = require("config");
    this.jwt = require("jsonwebtoken");
    this.io = io;
    io.on("connection", async (socket) => {
      let userData = this.jwt.verify(
        socket.handshake.query.token,
        this.config.get("TKK_USER_SECRET")
      );
      if (!userData) {
        return;
      }
      console.log(userData, "hey a new socket has been connected ");
      let { userType, id } = userData.user;

      if (this.onlineUsers[userType]) {
        if (this.onlineUsers[userType][id]) {
          this.onlineUsers[userType][id] = [
            ...this.onlineUsers[userType][id],
            socket,
          ];
        } else {
          this.onlineUsers[userType][id] = [socket];
          console.log(this.onlineUsers, " all the users now ");
        }
      }
      socket.on("CHAT_MESSAGE", (data) => {
        console.log(data, " hello this is the chat message ");

        let sender = {
          userType,
          id,
          message: data.message,
          product_id: data.product_id,
        };
        let receiver = {
          userType: data.receiver.userType,
          id: data.receiver.id,
        };
        if (sender && receiver) {
          this.chat(sender, receiver);
        }
      });
    });
  }

  sendMessage(type, sockets = [], data) {
    if (sockets) {
      for (let s = 0; s < sockets.length; s++) {
        if (sockets[s].emit(type, data)) {
          console.log("message sent");
        } else {
          console.log("sorry your message was no sent ");
        }
      }
    }
  }

  notifyUser(sender = {}, receiver = {}) {
    if (this.onlineUsers[receiver.userType]) {
      if (this.onlineUsers[receiver.userType][receiver.id]) {
        console.log("user is about to be notified");
        let sockets = this.onlineUsers[receiver.userType][receiver.id];
        this.sendMessage("USER_NOTIFICATION", sockets, {
          message: sender.message,
          sender: { userType: sender.userType, id: sender.id },
        });
      }
      // 5f15a7804461eb20cc777872
    }
  }

  // product_id
  // product_url
  // product_category
  // product_type
  // buyer_id
  // buyer_name
  // seller_id
  // seller_name
  // conversations
  // chat_date
  // user_status
  // last_message
  // chat_status

  chat(sender = {}, receiver = {}) {
    console.log(receiver.userType, "I believe this shour send actually ");

    let chat_id
    let product_id;
    let product_url;
    let product_category;
    let product_type;
    let buyer_id;
    let seller_id;
    let buyer_name;
    let seller_name;
    let conversations = [];
    let user_status;
    let last_message;
    let chat_status;
    if (receiver.userType === "buyer") {
      buyer_id = receiver.id;
      chart_id = receiver.id + sender.product_id
    } else if (receiver.userType === "seller") {
      seller_id = receiver.id;
    }
    if (sender.userType === "buyer") {
      buyer_id = sender.id;
      chart_id = sender.id + sender.product_id
    } else if (sender.userType === "seller") {
      seller_id = sender.id;
    }
    product_id = sender.product_id;
    conversations = [sender];
    last_message = sender.message;

    let ch = this.chatdb.update({chat_id},{
      product_id,chat_id,product_id,buyer_id,seller_id,
      last_message
    }, {
      upsert:true
    });
    ch.save()
    console.log(sender, " the sender data");
    console.log(receiver, " the receiver data");
    if (this.onlineUsers[receiver.userType]) {
      if (this.onlineUsers[receiver.userType][receiver.id]) {
        let sockets = this.onlineUsers[receiver.userType][receiver.id];
        this.sendMessage("CHAT_MESSAGE", sockets, {
          message: sender.message,
          sender: { userType: sender.userType, id: sender.id },
        });
      }
    }
  }
}

module.exports = TkkSocket;
