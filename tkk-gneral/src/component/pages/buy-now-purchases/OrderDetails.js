import React, { useEffect, useState, useContext } from "react";
import { BuyNowContext } from "./BuyNowState";
import { AuthContext } from "../../context/authContext/AuthState";

const OrderDetails = (props) => {
  const [orderId, setOrderId] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [order, setOrder] = useState([]);
  const [buyerName, setBuyerName] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const authCxt = useContext(AuthContext);
  const bnCxt = useContext(BuyNowContext);

  useEffect(() => {
    console.log(props, "All the props properties you should use in handy");
    if (props.match.params.orderid) {
      setOrderId(props.match.params.orderid);
      if (authCxt.token) {
        singleOrder(authCxt.token);
      }
    }
    if (order.length > 0) {
      let amount = 0;
      for (let i = 0; i < order.length; i++) {
        let o = order[i];
        amount = amount + o.items[0].post_price;
      }
      setTotalPrice(amount);
      setBuyerName(`${order[0].buyer_first_name} ${order[0].buyer_last_name}`);
      setTotalPrice(`${order[0].buyer_address}`);
      setTrackingNumber(`${order[0].tracking_number}`);
    }
  }, [authCxt.token, order.length]);

  const singleOrder = (token) => {
    if (!orderId) {
      return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/buyer/orders/${orderId}`, true);
    xhr.onload = () => {
      if (xhr.responseText) {
        if (JSON.parse(xhr.responseText)) {
          let res = JSON.parse(xhr.responseText);
          if (res) {
            setOrder(res.success);
            console.log(res, " the single order responsetext here now fool ");
          }
        }
      }
    };
    xhr.setRequestHeader("x-auth-user", token);
    xhr.send();
  };

  return (
    <>
    <div class="single-order-details">
      <div class="order-information">
        <h6>Order ID: {orderId}</h6>
        <h6>Placed on {order.length > 0 && order[0].date_placed}</h6>
        <h6 class="total-amount">Total: &#8358; {totalPrice}</h6>
      </div>
      <div class="items-in-your-order">
        <h6>ITEMS IN YOUR ORDER</h6>
        <div class="order-status d-flex justify-content-between flex-wrap flex-lg-row flex-wrap">
          <h6>
            Status: <span class="text-uppercase">Delivered</span>
          </h6>
          <a
            href={`/buyer/buy-now-purchases/orders/${orderId}/${trackingNumber}`}
          >
            TRACKING
          </a>
        </div>

        {order.length > 0 &&
          order.map((o, key) => (
            <div class="single-order-item" key={key}>
              <div class="row">
                <div class="col-md-3">
                  <img
                    class="img-fluid"
                    src={o.items[0].post_images[0]}
                    alt=""
                  />
                </div>
                <div class="col-md-9">
                  <div class="item-name">{o.items[0].post_item}</div>
                  <div class="item-price">&#8358; {o.items[0].post_title}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div class="payment-delivery-information">
        <div class="row">
          <div class="col-md-5">
            <div class="payment-information">
              <div class="header">
                <h6>PAYMENT INFORMATION</h6>
              </div>
              <div class="content">
                <h6>
                  Payment method
                  <span class="d-block">Online Payment Method</span>
                </h6>
                <h6>
                  Payment details
                  <span class="d-block">Items total: &#8358; {totalPrice}</span>
                </h6>
                <h6>
                  Shipping fees: <span>&#8358; 600</span>
                </h6>
                <h6>
                  Voucher Discount: <span>- &#8358; 1,000</span>
                </h6>
                <h6>
                  Total: <span>&#8358; 1,600</span>
                </h6>
              </div>
            </div>
          </div>
          <div class="col-md-5 offset-md-2">
            <div class="delivery-information">
              <div class="header">
                <h6>DELIVERY INFORMATION</h6>
              </div>
              <div class="content">
                <h6>
                  Delivery method
                  <span class="d-block">Standard Door Delivery</span>
                </h6>
                <h6>
                  Shipping Address
                  <span class="d-block">{buyerName}</span>
                  <span class="d-block mt-3">{buyerAddress}</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default OrderDetails;
