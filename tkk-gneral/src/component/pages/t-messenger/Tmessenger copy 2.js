import React, { useEffect, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "../../context/authContext/AuthState";
import { useState } from "react";
import { MessengerContext } from "./MessengerState";
import MyMessages from "./conversations/MyMessages";
import MessageBox from "./conversations/MessageBox";

let sock;

const Tmessenger = (props) => {
  
  const authCxt = useContext(AuthContext);
  const msgCxt = useContext(MessengerContext);
  const [productId, setProductId] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   theSocker();
  //   let usp = new URLSearchParams(props.location.search);
  //   if (usp.get("pid")) {
  //     setProductId(usp.get("pid"));
  //     getPrdoctInfo(usp.get("pid"));
  //     if (authCxt.token) {
  //       msgCxt.setValue({
  //         current_product_id: authCxt.user._id + usp.get("pid"),
  //       });
  //     }
  //     msgCxt.setValue({ current_chat_id: usp.get("pid") });
  //   }
  //   if (msgCxt.state.current_product_id) {
  //     setProductId(msgCxt.state.current_product_id);
  //     if (productId) {
  //       getPrdoctInfo(msgCxt.state.current_product_id);
  //     }
  //   }
  //   if (sock.io) {
  //     sock.on("CHAT_MESSAGE", (data) => {
  //       console.log(data, " seller id is here now  ");
  //       if (data.chatid) {
  //         return msgCxt.setChat({ data, to: data.chatid });
  //       }
  //     });
  //   }
  // }, [authCxt.token, msgCxt.state.current_product_id]);

  // const timeGetter = (t) => {
  //   let d = new Date(t);
  //   return d.getHours().toString() + ":" + d.getMinutes().toString();
  // };

  // const getPrdoctInfo = (pid) => {
  //   console.log("ok just the product info ");
  //   if (productId) {
  //     let xhr = new XMLHttpRequest();
  //     xhr.open("GET", `/api/chats/buyer/${pid}`, true);
  //     xhr.onload = () => {
  //       if (xhr.responseText) {
  //         if (JSON.parse(xhr.responseText)) {
  //           let res = JSON.parse(xhr.responseText);
  //           if (res.success) {
  //             setProduct(res.success);
  //             if (res.success.post_author) {
  //               let sid = res.success.post_author;
  //               setSellerId(sid);
  //               console.log(res.success.post_author, "seller id setted");
  //             }
  //           }
  //         }
  //       }
  //     };
  //     // xhr.setRequestHeader()
  //     xhr.send();
  //   }
  // };
  // const theSocker = () => {
  //   sock = authCxt.socket;
  //   return;
  // };

  // const replyMessage = (msg) => {
  //   console.log("replying message now ");
  //   let dn = Date.now();
  //   let d = new Date(dn);
  //   let time = d.getHours() + ":" + d.getMinutes();
  //   authCxt.socket.io &&
  //     authCxt.socket.emit("CHAT_MESSAGE", {
  //       message: msg,
  //       receiver: { userType: "seller", id: product.post_author },
  //       product_id: productId,
  //       file: {},
  //       date: Date.now(),
  //     });

  //   let data = {
  //     message: msg,
  //     chatid: msgCxt.state.current_chat_id,
  //     product_id: msgCxt.state.current_product_id,
  //     id: sellerId,
  //     userType: authCxt.user.userType,
  //     date: Date.now(),
  //     file: {},
  //   };
  //   return msgCxt.setChat({ data, to: data.chatid });
  // };
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
              <div className="col-md-7">
                {/* Message box */}
                <MessageBox />
              </div>
              {/* chat box ends here  */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tmessenger;
