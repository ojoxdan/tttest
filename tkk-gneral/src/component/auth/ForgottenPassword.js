import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/authContext/AuthState";
import { AlertContext } from "../context/alertContext/AlertState";

function ForgottenPassword(props) {
  const authCxt = useContext(AuthContext);
  const alertCxt = useContext(AlertContext)
  const { userLogin, loadUser, isAuthenticated } = authCxt;
  const [email, setEmail] = useState(null);
  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      // props.history.push("/");
      window.location= '/'
    }
    //eslint-disable-next-line
  }, [isAuthenticated, authCxt.token,props.history]);
  const validateFields = () => {
    if (email) {
      retrievePassword(email);
    }
  };
  const retrievePassword = (email) => {
    if (!email)return console.log("sorry you need to provide an email ")
    let df = new FormData();
    df.append("uemail", email);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/forgotten-password", true);
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status == 200) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText)
            if (res.success) {
              if (res.success.msg) {
                alertCxt.setAlert("success",res.success.msg)
              }
            }
            if (res.error) {
              if (res.error.msg) {
                alertCxt.setAlert("danger",res.error.msg)
              }
            }
            console.log(xhr.responseText, "the response text from the forgotten password backend ")

          }
        }
      }
    };
    xhr.send(df);
  };
  return (
    <>
      <section className="default-container">
        <div className="container">
          <div className="col-md-12">
            <div className="login-container">
              <div className="row align-items-center">
                <div className="col-md-6 left-part">
                  <div className="login-header">
                    <h5>Retrieve your Tinkoko Market place password</h5>
                    <p>Continue where you left off, when done.</p>
                  </div>
                  <div className="login-adverts">
                    <div className="media align-items-center">
                      <h2>
                        <i className="fa fa-tags"></i>
                      </h2>
                      <div className="media-body">
                        <h6>Start posting your products</h6>
                      </div>
                    </div>

                    <div className="media align-items-center">
                      <h2>
                        <i className="fa fa-cart-plus"></i>
                      </h2>
                      <div className="media-body">
                        <h6>Buying and selling of Agro products made easy</h6>
                      </div>
                    </div>

                    <div className="media align-items-center">
                      <h2>
                        <i className="fa fa-store-alt"></i>
                      </h2>
                      <div className="media-body">
                        <h6>
                          Manage your products / speed your Way through
                          checkouts
                        </h6>
                      </div>
                    </div>

                    <div className="media align-items-center">
                      <h2>
                        <i className="fa fa-shipping-fast"></i>
                      </h2>
                      <div className="media-body">
                        <h6>
                          Let Tinkoko handle your delivery or Transact with
                          thousands of veriﬁed sellers
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 right-part">
                  <div className="login-form">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validateFields();
                      }}
                    >
                      <div className="form-field">
                        <label htmlFor="email">Enter your email :</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          onChange={(el) => setEmail(el.target.value)}
                        />
                      </div>
                      <button type="submit">Retrieve password</button>
                    </form>
                    <div className="dont-have-an-account text-center">
                      <p>Don't have an account with Us?</p>
                      <a href="/register" className="signup-btn">
                        Sign Up
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgottenPassword;
