import React, { useEffect, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "../../context/authContext/AuthState";
import userProfileImg from "../../../images/user-profile.PNG";
import { useState } from "react";
import { MessengerContext } from "./MessengerState";
import MyMessages from "./conversations/MyMessages";

let sock;

const Tmessenger = (props) => {
  const authCxt = useContext(AuthContext);
  const msgCxt = useContext(MessengerContext);
  const [chat, setChat] = useState({});
  const [productId, setProductId] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    theSocker();
    let usp = new URLSearchParams(props.location.search);
    if (usp.get("pid")) {
      console.log("what are you waiting for ")
      setProductId(usp.get("pid"));
      getPrdoctInfo(usp.get("pid"));
    }
    if (msgCxt.state.current_product_id) {
      setProductId(msgCxt.state.current_product_id);
      if (productId) {
        getPrdoctInfo(msgCxt.state.current_product_id);
      }
    }
    if (sock) {
      // sock.on("CHAT_MESSAGE", (data) => {
      //     console.log(data, " seller id is here now  ");
      //     if (data.chat_id) {
      //       return msgCxt.setChat({ data, to: data.chat_id });
      //     }
      // });
      msgCxt.setSocket(sock)
    }
  }, [authCxt.token, msgCxt.state.current_product_id]);

  const timeGetter = (t) => {
    let d = new Date(t);
    return d.getHours().toString() + ":" + d.getMinutes().toString();
  };

  const getPrdoctInfo = (pid) => {
    console.log("ok just the product info ")
    if (productId) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `/api/chats/buyer/${pid}`, true);
      xhr.onload = () => {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              setProduct(res.success);
              if (res.success.post_author) {
                let sid = res.success.post_author;
                setSellerId(sid);
                console.log(res.success.post_author, "seller id setted");
              }
            }
          }
        }
      };
      // xhr.setRequestHeader()
      xhr.send();
    }
  };
  const theSocker = () => {
    if (authCxt.token && product) {
      console.log(authCxt.token, " ok it came handy at the tnessenger area ");
      sock = io("http://localhost:5000", { query: { token: authCxt.token } });
      sock.on("connection", () => {
        console.log(" hey the buyer has been connected to the socket ");
      });
    }
  };

  const replyMessage = (msg, userid) => {
    console.log("replying message now ");
    let dn = Date.now();
    let d = new Date(dn);
    let time = d.getHours() + ":" + d.getMinutes();
    let newReply;
    sock &&
      sock.emit("CHAT_MESSAGE", {
        message: msg,
        receiver: { userType: "seller", id: product.post_author },
        product_id: productId,
        file: {},
        date: Date.now(),
      });
    if (chat[userid]) {
      msgCxt.setChat({ data, to: data.chatid });

      let data = {
        chatid:msgCxt.state.current_chat_id,
        product_id:msgCxt.state.current_product_id,
        message:msg,
        id:sellerId
      }
      newReply = {
        [userid]: [...chat[userid], { reply: msg, date: dn, time }],
      };
      setChat({ ...chat, ...newReply });
      let box = document.querySelector(".rest-of-content");
      box && box.scrollTo(0, box.scrollHeight);
    } else {
      newReply = { [userid]: [{ reply: msg, date: dn, time }] };
      setChat({ ...chat, ...newReply });
      let box = document.querySelector(".rest-of-content");
      box && box.scrollTo(0, box.scrollHeight);
    }
  };

  return (
    <>

      <section className="messenger-section mb-5">
        <div className="container">
          <div className="messenger-container bg-white p-3">
            <div className="row">
              <div className="col-md-12">
                <h5 className="hero-text">Tinkoko Messenger</h5>
              </div>
            </div>

            <div className="row">
              <div className="col-md-5">
                <MyMessages />
              </div>
              {/* Message box starts here  */}
              {msgCxt.state.current_product && msgCxt.state.current_product._id && (
                <div className="col-md-7">
                  <div className="message-box">
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
                          <span className="name">{msgCxt.state.current_product.post_title}</span>
                          <span className="price">N {msgCxt.state.current_product.post_price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rest-of-content">
                      {msgCxt.state.chats &&
                        msgCxt.state.chats[msgCxt.state.current_chat_id] &&
                        msgCxt.state.chats[msgCxt.state.current_chat_id].map(
                          (c, key) => (
                            <div className="single-text" key={key}>
                              {c.message && c.userType !== authCxt.user.userType && (
                                <div
                                  className="message received"
                                  key={Date.now()}
                                >
                                  <p>{c.message}</p>
                                  <div className="time">
                                    {timeGetter(c.date)}
                                  </div>
                                </div>
                              )}
                              {c.userType == authCxt.user.userType && (
                                <div
                                  className="message sent"
                                  key={Date.now() + 1}
                                >
                                  <p>{c.message}</p>
                                  <div className="time">
                                    {timeGetter(c.date)}
                                    <i className="fa fa-check-double"></i>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        )}
                    </div>
                    <div className="send-message">
                      <div className="default-button">
                        <button>Ok</button>
                        <button>Call me</button>
                        <button>Thanks</button>
                      </div>
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
                            onKeyUp={(el) =>
                              el.keyCode === 13 &&
                              replyMessage(
                                el.target.value,
                                "5f15a7804461eb20cc777872"
                              )
                            }
                          />
                        </div>
                        <div className="file-speech">
                          <a
                            href="javascript:void"
                            onClick="$('#attachment').click()"
                          >
                            <i className="fa fa-paperclip"></i>
                          </a>
                          <input
                            type="file"
                            name=""
                            id="attachment"
                            className="d-none"
                            accept="image/*"
                          />
                          <a
                            href="javascript:void"
                            onClick="$('#recording').click()"
                          >
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
                </div>
              )}
              {/* chat box ends here  */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tmessenger;
