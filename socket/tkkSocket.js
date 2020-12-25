const { find } = require("../database/models/public/ChatModel");

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
        }
      }
      socket.on("JUST_TESTING", (d) => {
        console.log(d, " my data");
      });
      socket.on("LAST_SEEN", (d) => {
        console.log(d, " ok setting the last seen ");
      });
      socket.on("CHAT_MESSAGE", async (data) => {
        let productExist = await this.postdb.findOne({ _id: data.product_id });
        console.log(data, "the full data from the sender ");
        if (!productExist) {
          return;
        }
        let chatExist = await this.chatdb.findOne({
          _id: data.chat_id,
          product_id: data.product_id,
        });
        if (!chatExist) {
          chatExist = await this.chatdb.findOne({
            product_id: data.product_id,
            sender: id,
          });
        }
        let sender = {
          chat_id: chatExist && chatExist._id,
          message: data.message,
          userType,
          id,
          product_id: data.product_id,
          date: data.date,
        };

        if (sender) {
            await this.chat(sender);
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
          //
          console.log("sorry your message was no sent ");
        }
      }
    }
  }

  notifyUser(sender = {}, receiver = {}) {
    console.log("this do the notified ");
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

  chat = async (sender = {}) => {
    let senderdata =  this.userdb.findOne({_id:sender.id})
    let receiver = {}
    let seller_name;
    let product_title;
    let buyer_id;
    let seller_id;
    let last_message = {};
    last_message = sender;
    
    let post = await this.postdb.findOne({ _id:  sender.product_id });
    if (!post) return;
    product_title = post.post_title;
    seller_id = post.post_author;
    seller_name = post.post_author_company;
    let newMessage = {};
    // console.log(sender.chat_id,"sender to be updated")
    if (sender.chat_id) {
      newMessage = await this.chatdb.updateOne(
        { _id: String(sender.chat_id), product_id:sender.product_id },
        {
          chat_date:sender.date,
          last_message,
          seller_name,
          product_title,
          $push: { conversations: sender },
        }
        );
        newMessage._id = sender.chat_id
      } else if (!sender.chat_id) {
      console.log("chat does not exist")
      newMessage = new this.chatdb({
        chat_date:Date.now(),
        sender: sender.id,
        receiver: seller_id,
        product_id:sender.product_id,
        receiver_user_type:"seller",
        sender_user_type:sender.userType,
        last_message,
        sender_name:senderdata.firstName,
        receiver_name:seller_name,
        product_title,
        conversations: [],
      });
      newMessage.conversations = [{...sender, chat_id:newMessage._id}]
      newMessage.save();
    }

    if (newMessage) {
      let updatedChat = await this.chatdb.findOne({_id:newMessage._id})
      if (!updatedChat) {
        updatedChat = newMessage
      }
      let receiver = {}
      if (updatedChat.receiver !== sender.id) {
        receiver = {id: updatedChat.receiver, userType : updatedChat.receiver_user_type}
      }else{
        receiver = {id: updatedChat.sender, userType : updatedChat.sender_user_type}
      }

      if (this.onlineUsers[receiver.userType]) {
        if (this.onlineUsers[receiver.userType][receiver.id]) {
          let sockets = this.onlineUsers[receiver.userType][receiver.id];
          this.sendMessage("CHAT_MESSAGE", sockets, {
            ...sender,
            chat_id: String(newMessage._id),
          });
        }
        if (this.onlineUsers[sender.userType][sender.id]) {
          let sockets = this.onlineUsers[sender.userType][sender.id];
          this.sendMessage("CHAT_MESSAGE", sockets, {
            ...sender,
            chat_id: String(newMessage._id),
          });
        }
      }
    }
  };
}

module.exports = TkkSocket;
