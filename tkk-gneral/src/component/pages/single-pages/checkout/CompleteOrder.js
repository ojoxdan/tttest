import React, { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import { CheckOutContext } from "./CheckOutState";
import * as urlStringObject from "../../../utils/urlStringObject";
import removeFromCart from "../../../utils/removeFromCart";
import { CartContext } from "../../../common/DropDownCart";
import getCartItems from "../../../utils/getCartItems";


const CompleteOrder = (props) => {
  const chCxt = useContext(CheckOutContext);
  const cartCxt = useContext(CartContext)
  const [orderedProductsId,setOrderedProductsId] = useState([])
  useEffect(() => {
    if (props.match.params.cart) {      
      urlStringObject.decodeData(props.match.params.cart).then((data) => {
        console.log(data, "the payload data ");
        chCxt.setValue({completedOrder:data.data})
        if (props.match.params.msg) {
          urlStringObject.decodeData(props.match.params.msg).then((msg) => {
            if (msg.data.status) {
              // console.log(msg, "the payload data ");
              if (Array.isArray(chCxt.state.completedOrder)) {                
                for (let i = 0; i < chCxt.state.completedOrder.length; i++) {
                  let items = chCxt.state.completedOrder[i];
                  if (Array.isArray(chCxt.state.completedOrder)) {
                    for (let j = 0; j < chCxt.state.completedOrder.length; j++) {
                      let item = chCxt.state.completedOrder[j];
                      console.log(getCartItems(item._id), "the cart item")
                      setOrderedProductsId([...orderedProductsId,item._id])
                      cartCxt.removeItem(item._id)
                    }
                    if (Array.isArray(chCxt.state.completedOrder)) {
                      for (let j = 0; j < chCxt.state.completedOrder.length; j++) {
                        let item = chCxt.state.completedOrder[j];
                        removeFromCart(item._id)
                      }
                    }
                  }
                  
                }

              }
            }
          })
          // chCxt.setValue({ selectedItems: data.payload });
        }
      });
    }
  }, [chCxt.state.completedOrder.length])
  useEffect(() => {
    for (let o = 0; o < orderedProductsId.length; o++) {
      let id = orderedProductsId[o];
        removeFromCart(id)
    }
  }, [orderedProductsId])
  return (
    <>
    <section className="default-container">
      <div className="container order-complete ">
        <div className="row order-navigation mb-4">
          <div className="col-md-12">
            <div className="nav-menu">
              <div className="row">
                <div className="col-md-4">
                  <h6 className="default active">
                    <i className="fa fa-check-circle active"></i> Shopping Cart
                  </h6>
                </div>
                <div className="col-md-4">
                  <h6 className="default active">
                    <i className="fa fa-check-circle active"></i> Checkout
                  </h6>
                </div>
                <div className="col-md-4">
                  <h6>
                    <i className="fa fa-check-circle active"></i> Finish
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        { Array.isArray(chCxt.state.completedOrder) && (
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="white-bg">
                <div className="header d-flex justify-content-between align-content-center">
                  <h5 className="bold-green-text font-weight-bold">
                    Thank You! Your order has been placed successfully
                  </h5>
                  <a href="#">
                    <i className="fa fa-print"></i>
                  </a>
                </div>
                <div className="order-details">

                  {
                    chCxt.state.completedOrder.map((co, key)=>(
                      <Fragment key={key}>
                      <div className="order-id">
                        <h4>
                          Your order ID Is: {co._id}{" "}
                        </h4>
                        <p>
                          An email receipt, including the details of your order has
                          been sent to <strong>{co.buyer_email}</strong>
                          {/* xxxxx@gmail.com. */}
                        </p>
                      </div>
                      <div className="order-shipping-address">
                        <h4>This order will be shipped to </h4>
                        <p>
                          {co.buyer_first_name}
                          {co.buyer_last_name} <br />
                          {co.buyer_address}, <br />{" "}
                          {co.buyer_state}
                          {co.buyer_country} <br />
                          {co.buyer_phone}
                        </p>
                      </div>
                    </Fragment>
                    ))
                  }

                  <div className="order-shipment-method">
                    <h4>Shipping Method </h4>
                    <p>Tinkoko Logistics - standard delivery</p>
                  </div>
                  <div className="order-payment-method">
                    <h4>Payment Method </h4>
                    <p>Rave by Flutterwave</p>
                  </div>
                  <div className="questions-area">
                    <h4>Questions?</h4>
                    <p>
                      Have any questions about your order? Feel free to contact
                      us{" "}
                      <span>
                        <a href="contact.html">here</a>
                      </span>{" "}
                    </p>
                    <p>Or call 0703-698-0011</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default CompleteOrder;
