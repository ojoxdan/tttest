import React, { useContext, useEffect } from "react";
import { CheckOutContext } from "./CheckOutState";
import { AuthContext } from "../../../context/authContext/AuthState";
import * as urlStringObject from "../../../utils/urlStringObject";

const CheckOutPage = (props) => {
  const chCxt = useContext(CheckOutContext);
  const authCxt = useContext(AuthContext);
  useEffect(() => {
    urlStringObject.decodeData(props.match.params.cart).then((data) => {
      if (data) {
        if (data.payload) {
          chCxt.setValue({ selectedItems: data.payload });
        }
      }
    });
  }, [authCxt.token]);
  useEffect(() => {
    chCxt.calculateTotal();
  }, [chCxt.state.selectedItems.length]);



  const submitOrder = () => {
    // orders
    // paymethod
    // bfn
    // bln
    // bphone
    // baddr
    // bcity
    // bstate
    // bcountry
    let dataForm = new FormData();
    if (
      chCxt.state.firstName &&
      chCxt.state.lastName &&
      chCxt.state.phoneNumber &&
      chCxt.state.address &&
      chCxt.state.city &&
      chCxt.state.state &&
      chCxt.state.country &&
      chCxt.state.orderTotal &&
      chCxt.state.selectedItems &&
      chCxt.state.email
    ) {
      dataForm.append("orders", JSON.stringify(chCxt.state.selectedItems));
      dataForm.append("bfn", chCxt.state.firstName);
      dataForm.append("bln", chCxt.state.lastName);
      dataForm.append("bphone", chCxt.state.phoneNumber);
      dataForm.append("baddr", chCxt.state.address);
      dataForm.append("bcity", chCxt.state.city);
      dataForm.append("bstate", chCxt.state.state);
      dataForm.append("bcountry", chCxt.state.country);
      dataForm.append("ototal", chCxt.state.orderTotal);
      dataForm.append("bemail", chCxt.state.email);
      dataForm.append("paymethod", "online");

      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/buyer/orders", true);
      xhr.onload = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
          if (xhr.responseText) {
            if (JSON.parse(xhr.responseText)) {
              let res = JSON.parse(xhr.responseText).success;
              if (res) {
                // return
                if (res.authorization_url) {
                  window.location = res.authorization_url;
                  // console.log(res, "the response text ")
                }
              }
            }
          }
        }
      };
      xhr.setRequestHeader("x-auth-user", authCxt.token);
      xhr.send(dataForm);
    } else {
      console.log("Please make sure you fill all forms");
    }
  };


  const useProfileData = () => {
    chCxt.setValue({
      firstName: authCxt.user.firstName,
      lastName: authCxt.user.lastName,
      phoneNumber: authCxt.user.phoneNumber,
      address: authCxt.user.address,
      city: authCxt.user.city,
      state: authCxt.user.state,
      country: authCxt.user.country,
      email: authCxt.user.email,
    });
  };


  return (
    <section className="default-container">
      <div className="container">
        <div className="row mb-4 order-navigation">
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
                    <i className="fa fa-check-circle"></i> Finish
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row customer-fulfillment-details">
          <div className="col-md-7 mb-4">
            <div className="white-bg">
              <div className="header d-flex justify-content-between align-content-center">
                <h5 className="light-green-text font-weight-bold">
                  Customer Fulfillment Details
                </h5>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // useProfileData();
                  }}
                >
                  My Profile
                </a>
              </div>
              <div className="form-container">
                <form action="">
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-field">
                        <label htmlFor="firstname">First Name</label>
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          onChange={(el) =>
                            chCxt.setValue({ firstName: el.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-field">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                          type="text"
                          name="lastname"
                          onChange={(el) =>
                            chCxt.setValue({ lastName: el.target.value })
                          }
                          id="lastname"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          onChange={(el) =>
                            chCxt.setValue({ email: el.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-field">
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input
                          type="number"
                          name="phonenumber"
                          id="phonenumber"
                          onChange={(el) =>
                            chCxt.setValue({ phoneNumber: el.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      onChange={(el) =>
                        chCxt.setValue({ address: el.target.value })
                      }
                    />
                  </div>

                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-field">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          onChange={(el) =>
                            chCxt.setValue({ city: el.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-field">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          onChange={(el) =>
                            chCxt.setValue({ state: el.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      onChange={(el) =>
                        chCxt.setValue({ country: el.target.value })
                      }
                    />
                  </div>

                  <h5 className="bold-green-text mb-3">Payment Method</h5>
                  <div className="form-row bg-grey mb-3 align-items-baseline">
                    <div className="col-md-6 mt-lg-3">
                      <div className="form-field">
                        <input
                          type="radio"
                          name="rave"
                          id="rave"
                          defaultChecked={true}
                        />
                        <label
                          htmlFor="rave"
                          className="font-weight-bold grey-text big-label mb-0"
                        >
                          Rave by Flutterwave
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="accepted-card">
                        <img
                          src="../../images/mastercard.PNG"
                          alt=""
                          className="img-fluid"
                        />
                        <img
                          src="../../images/visa.PNG"
                          alt=""
                          className="img-fluid"
                        />
                        <img
                          src="../../images/americanexpress.PNG"
                          alt=""
                          className="img-fluid"
                        />
                        <img
                          src="../../images/discover.PNG"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <p>
                    By Clicking the button, you agree to our{" "}
                    <span>
                      <a href="#">terms and conditions</a>
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={(el) => {
                      submitOrder();
                    }}
                    className="place-order"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-5 product-cart-summary">
            <div className="white-bg">
              <h5 className="light-green-text text-center mb-4">
                Product Cart Summary
              </h5>
              {/* summary items  */}

              {chCxt.state.cartItems &&
                chCxt.state.selectedItems.map((i, key) => (
                  <div className="single-item" key={key}>
                    <h5 className="grey-text font-weight-bold">{i.title}</h5>
                    <h5 className="yellow-text">&#8358; {i.price}</h5>
                  </div>
                ))}
              <div className="shipping-cost">
                <div className="totals d-flex justify-content-between align-content-center">
                  <h5 className="grey-text font-weight-bold">Shipping Cost</h5>
                  <h5 className="yellow-text">
                    &#8358; {chCxt.state.shippingTotal}
                  </h5>
                </div>
                <span>
                  (Delivery between 1 to 3 days; Outside abuja, 3 - 5 days)
                </span>
              </div>
              <div className="overall-total d-flex justify-content-between align-content-center">
                <h5 className="bold-green-text font-weight-bold">Total</h5>
                <h5 className="yellow-text">
                  &#8358; {chCxt.state.orderTotal}
                </h5>
                <hr />
              </div>
              <hr />
              <div className="overall-total">
                <h5 className="bold-green-text font-weight-bold">
                  You will be Paying
                </h5>
                <h5 className="yellow-text">
                  &#8358;{" "}
                  {parseFloat(chCxt.state.orderTotal) +
                    parseFloat(chCxt.state.shippingTotal)}
                </h5>
              </div>
              {/* summary item stops here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
