import React, { useEffect, useContext } from "react";

import userProfileImg from "../../../../images/user-profile.PNG";
import { AuthContext } from "../../../context/authContext/AuthState";
import { MessengerContext } from "../MessengerState";

const MyMessages = () => {
  const authCxt = useContext(AuthContext);
  const msgCxt = useContext(MessengerContext);
  useEffect(() => {
    if (authCxt.token) {
      msgCxt.getMyMessages(authCxt.token);
      if (msgCxt.state.current_chat_id) {
        getCurrentConversations(authCxt.token, msgCxt.state.current_chat_id);
      }
    }
  }, [authCxt.token]);
  const getCurrentConversations = (token, chatid) => {
    if (!chatid) return;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/chats/my-messages/${chatid}/chat`, true);
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              if (Array.isArray(res.success.conversations)) {
                let current_chat = res.success
                console.log("res need to show now ");
                msgCxt.setValue({
                  current_chat: res.success,
                  current_product: current_chat.post,
                });
              }
            }
          }
        }
      }
    };
    xhr.setRequestHeader("x-auth-user", token);
    xhr.send();
  };
  return (
    <div className="my-messages">
      <div className="header d-flex justify-content-between">
        <h6>My messages</h6>
        <div className="drop-menu">
          <button className="nav-icon">
            <i className="fa fa-bars"></i>
          </button>
          <div className="dropdown-content">
            <a href="tmessenger-all.html">Active Chats</a>
            <a href="tmessenger-archived.html">Archived Chats</a>
            <a href="tmessenger-spam.html">Spam Chats</a>
          </div>
        </div>
      </div>

      <div className="content">
        {Array.isArray(msgCxt.state.allChats) &&
          msgCxt.state.allChats.map((convo, key) => (
            <a
              href="#"
              key={key}
              onClick={(e) => {
                e.preventDefault();
                console.log(convo, "the convo");
                getCurrentConversations(authCxt.token, convo._id);
                if (msgCxt.state.current_product_id !== convo.product_id) {
                  msgCxt.setValue({
                    current_chat_id: convo._id,
                    current_chat: convo,
                    current_product_id: convo.product_id,
                  });
                }
              }}
            >
              <div
                className="media"
                key={convo._id}
                style={{
                  background:
                    msgCxt.state.current_product._id === convo.product_id
                      ? "#eee"
                      : "",
                }}
              >
                <img className="img-fluid" src={userProfileImg} alt="" />
                <div className="media-body">
                  <div className="user">
                  <span className="blocked">{convo.chat_status}</span> 
                    {convo.seller_name}{" "}
                    <span className="float-right">{convo.chat_date}</span>
                  </div>
                  <div className="topic">{convo.product_title}</div>
                  <div className="last-message">
                    {convo.last_message.userType === authCxt.user.userType ? (
                      <i><small>you:</small> {convo.last_message.message}</i>
                    ) : (
                      convo.last_message.message
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};

export default MyMessages;
