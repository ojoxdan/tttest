class TkkSocket {
  onlineUsers = {
    admin: {},
    buyer: {},
    seller: {},
  };
  constructor(io) {
    this.chatdb = require("../database/models/public/ChatModel");
    this.userdb = require("../database/models/public/UsersModel");
    this.postdb = require("../database/models/seller/my-product/PostModel");
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
      socket.on("JUST_TESTING", (d)=>{
          console.log(d, " my data")
      })
      socket.on("LAST_SEEN", (d)=>{
          console.log(d, " ok setting the last seen ")
      })
      socket.on("CHAT_MESSAGE", (data) => {
        console.log(data, " hello this is the chat message ");

        let sender = {
          message: data.message,
          userType,
          id,
          product_id: data.product_id,
          date:data.date
        };
        let receiver = {
          userType: data.receiver.userType,
          id: data.receiver.id,
        };
        if (sender && receiver) {
          let u = this.userdb.findOne({ _id: receiver.id });
          if (u) {
            this.chat(sender, receiver);
          }
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
    console.log("this do the notified ")
    if (this.onlineUsers[receiver.userType]) {
      if (this.onlineUsers[receiver.userType][receiver.id]) {
        console.log("user is about to be notified");
        let sockets = this.onlineUsers[receiver.userType][receiver.id];
        this.sendMessage("USER_NOTIFICATION", sockets, {
          message: sender.message,
          sender: { userType: sender.userType, id: sender.id },
        });
      }
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

  chat = async (sender = {}, receiver = {}) => {
    let chat_id;
    let seller_name;
    let product_title;
    let product_id;
    let buyer_id;
    let seller_id;
    let last_message;
    if (receiver.userType === "buyer") {
      buyer_id = receiver.id;
      chat_id = receiver.id + sender.product_id;
    } else if (receiver.userType === "seller") {
      seller_id = receiver.id;
    }
    if (sender.userType === "buyer") {
      buyer_id = sender.id;
      chat_id = sender.id + sender.product_id;
    } else if (sender.userType === "seller") {
      seller_id = sender.id;
    }
    product_id = sender.product_id;
    sender.chatid = chat_id
    last_message = sender;
    let post = await this.postdb.findOne({ _id: product_id });
    if (!post) return;
    product_title = post.post_title;
    seller_id = post.post_author
    seller_name = post.post_author_company;
    await this.chatdb.updateOne(
      { chat_id },
      {
        product_id,
        chat_id,
        product_id,
        buyer_id,
        seller_id,
        last_message,
        seller_name,
        product_title,
        $push: { conversations: sender },
      },
      {
        upsert: true,
      }
    );
    console.log(sender, " the sender data");
    console.log(receiver, " the receiver data");
    if (this.onlineUsers[receiver.userType]) {
      if (this.onlineUsers[receiver.userType][receiver.id]) {
        let sockets = this.onlineUsers[receiver.userType][receiver.id];
        this.sendMessage("CHAT_MESSAGE", sockets, {
          ...sender
        });
      }
    }
  };
}

module.exports = TkkSocket;
