import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext/AuthState";
import userProfileImg from "../../../../images/user-profile.PNG";
import { MessengerContext } from "../MessengerState";
let sock;
const MessageBox = (props) => {
  const authCxt = useContext(AuthContext);
  const msgCxt = useContext(MessengerContext);
  const [productId, setProductId] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    theSocker();
    let usp = new URLSearchParams(props.location.search);
    if (authCxt.token,usp.get("pid")) {
      setProductId(usp.get("pid"));
      msgCxt.getProductInfo(authCxt.token, usp.get("pid"))
    }
    
  }, [authCxt.token]);

  useEffect(() => {
    let usp = new URLSearchParams(props.location.search);
    if (authCxt.token,usp.get("pid")) {
      setProductId(usp.get("pid"));
      msgCxt.setValue({
        current_product_id: usp.get("pid"),
      });
      msgCxt.getProductInfo(authCxt.token, usp.get("pid"))
    }
  }, [msgCxt.state.allChats.length])
  let ros = document.querySelector(".rest-of-content");
  let st = document.querySelectorAll(".single-text");

  useEffect(() => {
    if (st.length > 0) {
      ros.scrollTop = parseInt(ros.scrollHeight);
    }
  }, [st && st.length, msgCxt.state.chats.length]);

  const timeGetter = (t) => {
    let d = new Date(t);
    return d.getHours().toString() + ":" + d.getMinutes().toString();
  };

  useEffect(() => {
    if (authCxt.socket.io) {
      authCxt.socket.on("CHAT_MESSAGE", (data)=>{
        if (data.chat_id) {
           msgCxt.setChat({ data});
        }
        if (Array.isArray(msgCxt.state.allChats)) {
          let ac= msgCxt.state.allChats
          let chatExist = msgCxt.state.allChats.some((ac)=>ac._id === data.chat_id)
          console.log(chatExist, `${data.chat_id}`)
          if (!chatExist) {
            msgCxt.getMyMessages(authCxt.token)
          }
        }
      })
    }
  }, [authCxt.socket.io])

  const theSocker = () => {
    sock = authCxt.socket;
    return;
  };

  const replyMessage = (msg) => {
    authCxt.socket.io &&
      authCxt.socket.emit("CHAT_MESSAGE", {
        chat_id: msgCxt.state.current_chat._id,
        message: msg,
        product_id: msgCxt.state.current_product_id,
        file: {},
        date: Date.now(),
      });

  };

  return (
    <>
      {msgCxt.state.current_product && msgCxt.state.current_product._id && (
        <div className="message-box">
          {/* <div className="message-box"> */}
          <div className="header d-flex justify-content-between align-items-center">
            <img className="img-fluid" src={userProfileImg} alt="" />
            <p>{msgCxt.state.current_product.post_author_company}</p>
            <div className="dropdown dropleft">
              <button
                className="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v"></i>
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Archive
                </a>

                <a className="dropdown-item" href="#">
                  Spam
                </a>
              </div>
            </div>
          </div>
          <div className="message-details">
            <div className="media">
              <img
                className="img-fluid"
                src={msgCxt.state.current_product.post_images[0]}
                alt=""
              />
              <div className="media-body">
                <span className="name">
                  {msgCxt.state.current_product.post_title}
                </span>
                <span className="price">
                  N {msgCxt.state.current_product.post_price}
                </span>
              </div>
            </div>
          </div>

          <div
            className="rest-of-content"
            onChange={() => {
              let ros = document.querySelector(".rest-of-content");
              if (ros && st.length > 0) {
                ros.scrollTop = parseInt(ros.scrollHeight);
              }
            }}
          >
            {msgCxt.state.current_chat &&
              Array.isArray(msgCxt.state.current_chat.conversations) &&
              msgCxt.state.current_chat.conversations.map((c, key) => (
                <div className="single-text" key={key}>
                  {c.message && c.userType !== authCxt.user.userType && (
                    <div className="message received" key={Date.now()}>
                      <p>{c.message}</p>
                      <div className="time">{timeGetter(c.date)}</div>
                    </div>
                  )}
                  {c.userType == authCxt.user.userType && (
                    <div className="message sent" key={Date.now() + 1}>
                      <p>{c.message}</p>
                      <div className="time">
                        {timeGetter(c.date)}
                        <i className="fa fa-check-double"></i>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="send-message">
            <form
              action=""
              onSubmit={(e) => e.preventDefault()}
              className="input-fields"
            >
              <div className="form-field">
                <input
                  data-emoji-picker="true"
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Enter your text here"
                  autoComplete="off"
                  onKeyUp={(el) => {
                    if (el.keyCode === 13 && el.target.value) {
                      replyMessage(el.target.value);
                      el.target.value = "";
                    }
                  }}
                />
              </div>
              <div className="file-speech">
                <a href="javascript:void" onClick="$('#attachment').click()">
                  <i className="fa fa-paperclip"></i>
                </a>
                <input
                  type="file"
                  name=""
                  id="attachment"
                  className="d-none"
                  accept="image/*"
                />
                <a href="javascript:void" onClick="$('#recording').click()">
                  <i className="fa fa-microphone"></i>
                </a>
                <input
                  type="file"
                  name=""
                  id="recording"
                  className="d-none"
                  accept="audio/*"
                  capture="microphone"
                />
              </div>
              <div></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBox;
