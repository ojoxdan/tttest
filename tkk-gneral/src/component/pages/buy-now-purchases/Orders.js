import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BuyNowContext } from "./BuyNowState";
import { AuthContext } from "../../context/authContext/AuthState";
import productImg from "../../../images/product-image.PNG";

const Orders = () => {
  const bnCxt = useContext(BuyNowContext);
  const authCxt = useContext(AuthContext);
  useEffect(() => {
    if (authCxt.token) {
      bnCxt.getOrders(authCxt.token);
    }
  }, [authCxt.token]);

  return (
    <>
      <div className="content-header">
        <h4 className="yellow-text">Orders ({bnCxt.state.orders.length})</h4>
      </div>
      <div className="orders">
        {bnCxt.state.orders &&
          bnCxt.state.orders.map((order, key) => (
            <div className="single-order">
              <div className="row">
                <div className="col-lg-3">
                  <img
                    className="img-fluid"
                    src={order.items[0].post_images[0]}
                    alt=""
                  />
                </div>
                <div className="col-lg-9">
                  <div className="order-title-and-details d-flex justify-content-between flex-wrap flex-lg-row flex-md-row flex-sm-column">
                    <h5>{order.items[0].post_title}</h5>
                    <a
                      href={`/buyer/buy-now-purchases/orders/${order.cart_id}`}
                    >
                      SEE DETAILS
                    </a>
                  </div>
                  <div className="ordered-date">
                    <p>Placed on {order.date_placed}</p>
                  </div>
                  <div className="order-status">
                    <p className="delivered">
                      <i className="fa fa-check-double"></i> delivered on
                      {order.date_delivered}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="col-md-12 mt-4 text-center">
          <ul className="products-pagination">
            <li>
              <a href="#">
                <i className="fa fa-fast-backward"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-step-backward"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-step-forward"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-fast-forward"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Orders;
