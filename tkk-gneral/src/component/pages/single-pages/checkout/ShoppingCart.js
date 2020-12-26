import React, { useState, useEffect } from "react";
import * as urlStringObject from "../../../utils/urlStringObject";
import nairaFormartter from "../../../utils/nairaFormartter";
import removeFromCart from "../../../utils/removeFromCart";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CheckOutContext } from "./CheckOutState";
import { CartContext } from "../../../common/DropDownCart";

const ShoppingCart = (props) => {
  const chCxt = useContext(CheckOutContext);
  const cartCxt = useContext(CartContext);

  useEffect(() => {
    chCxt.setToDefaultCart();
  }, []);
  const generateCheckoutUrl = () => {
    if (Array.isArray(chCxt.state.selectedItems)) {
      if (chCxt.state.selectedItems.length > 0) {
        let checkoutQuery = urlStringObject.encodeData(
          chCxt.state.selectedItems
        );
        if (checkoutQuery) {
          checkoutQuery.then((data) => {
            props.history.push(`/checkout/${data}`);
          });
        }
      }
    }
  };
  return (
    <>
      <section className="default-container">
        <div className="container ">
          <div className="row order-navigation mb-4">
            <div className="col-md-12">
              <div className="nav-menu">
                <div className="row">
                  <div className="col-md-4">
                    <h6 className="default active">
                      <i className="fa fa-check-circle active"></i> Shopping
                      Cart
                    </h6>
                  </div>
                  <div className="col-md-4">
                    <h6 className="default">
                      <i className="fa fa-check-circle"></i> Checkout
                    </h6>
                  </div>
                  <div className="col-md-4">
                    <h6>
                      <i className="fa fa-check-circle"></i> Finish
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row buy-now-cart">
            <div className="col-md-7 cart-list mb-4">
              <div className="white-bg">
                <div className="cart-list-header">
                  <h5>
                    <a href="">
                      <i className="fa fa-arrow-circle-left mr-3"></i>{" "}
                      <span className="bold-green-text">
                        Buy Now Products Cart
                      </span>
                    </a>
                  </h5>
                </div>

                {Array.isArray(chCxt.state.cartItems) > 0 &&
                  chCxt.state.cartItems.map((cart, key) => (
                    <div className="single-cart-item" key={key}>
                      <div className="row">
                        <div className="col-md-1 align-self-center">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            onChange={(el) => {
                              if (!el.target.checked) {
                                chCxt.unMarkItem(cart.id);
                              } else {
                                chCxt.markItem(cart.id);
                              }
                            }}
                            defaultChecked={true}
                          />
                        </div>
                        <div className="col-md-3">
                          <img className="img-fluid" src={cart.image} alt="" />
                        </div>
                        <div className="col-md-8">
                          <div className="price-and-name mb-1 d-flex justify-content-between align-content-center">
                            <h5 className="light-green-text">{cart.title}</h5>
                            <h5 className="yellow-text">
                              &#8358; {nairaFormartter(cart.price)}
                            </h5>
                          </div>
                          <h6 className="grey-text">
                            <span>Tools & Machinery</span> |{" "}
                            <span>Karimo, Abuja</span>
                          </h6>
                          <div className="buy-now-and-remove mt-2 d-flex justify-content-between align-content-center">
                            <div className="tag">
                              <i className="fa fa-truck"></i> Buy Now
                            </div>
                            <div className="remove">
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeFromCart(cart.id);
                                  chCxt.removeItem(cart.id);
                                }}
                                href="#"
                              >
                                Remove
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {Array.isArray(chCxt.state.selectedItems) && (
                <div className="col-md-5">
                  <div className="total-summary">
                    <div className="white-bg">
                      <h4 className="light-green-text text-center mb-4">
                        Total Summary
                      </h4>
                      <div className="items-totals d-flex justify-content-between align-content-center mb-2">
                        <h5 className="grey-text">Item(s) Totals</h5>
                        <h5 className="yellow-text">
                          &#8358; {nairaFormartter(chCxt.state.orderTotal)}
                        </h5>
                      </div>
                      <div className="shipping-totals d-flex justify-content-between align-content-center mb-3">
                        <h5 className="grey-text">Shipping Totals</h5>
                        <h5 className="yellow-text">
                          &#8358; {nairaFormartter(chCxt.state.orderTotal)}
                        </h5>
                      </div>
                      <div className="order-totals d-flex justify-content-between align-content-center">
                        <h5 className="grey-text">Order Total</h5>
                        <h5 className="yellow-text">
                          &#8358; {nairaFormartter(chCxt.state.orderTotal)}
                        </h5>
                      </div>
                      <div className="proceed-to-checkout text-center">
                        <Link
                          onClick={(el) => {
                            el.preventDefault();
                            generateCheckoutUrl();
                          }}
                          to=""
                        >
                          Proceed to Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
