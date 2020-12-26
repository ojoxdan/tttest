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
                <MessageBox {...props}/>
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
