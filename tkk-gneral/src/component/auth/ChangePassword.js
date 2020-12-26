import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/authContext/AuthState";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYnV5bm93QGdtYWlsLmNvbSIsImlkIjoiNWY3OTgzNTQ4MjE5MTQzMzgwYmJjOTgzIiwidXNlclR5cGUiOiJidXllciJ9LCJpYXQiOjE2MDg0NTc0OTQsImV4cCI6MTYxMjA1NzQ5NH0.8tGcjdF8k3U4HQSJj8TirdXCRPwwg3424Z35jQJl88E

function ChangePassword(props) {
  const authCxt = useContext(AuthContext);
  const { userLogin, loadUser, isAuthenticated } = authCxt;
  const [email, setEmail] = useState(null);
  const [urlToken, setUrlToken] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  useEffect(() => {
    console.log(props.match.params.token, "the token to change password ");
    if (props.match.params.token) {
      setUrlToken(props.match.params.token);
      RetrieveDetail(props.match.params.token);
    }
    loadUser();
    if (isAuthenticated) {
      // props.history.push("/");
      window.location= '/'
    }
  }, [isAuthenticated, authCxt.token,props.history]);

  const validateToken = () => {
    if (email) {
      RetrieveDetail(email);
    }
  };
  const RetrieveDetail = (token) => {
    if (!token) return console.log("sorry you need to provide your token ");
    let df = new FormData();
    df.append("token", token);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/change-password/user-detail", true);
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status == 200) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              setEmail(res.success.email);
            } else {
              // props.history.push("/auth/forgotten-password");
              window.location= '/auth/forgotten-password'
            }
            console.log(
              xhr.responseText,
              "the response text from the forgotten password backend "
            );
          }
        }
      }
    };
    xhr.send(df);
  };
  const changeToNewPassword = () => {
    if (!urlToken && password) return console.log("Please enter new password ");
    if (password !== confirmPassword) return console.log("Please make sure your password matches ");
    let df = new FormData();
    df.append("token", urlToken);
    df.append("newpwd", urlToken);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/change-password", true);
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status == 200) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            console.log(res, "the passwsord has been changed")
            if (res.success) {
              localStorage.token = res.success.token
              if (localStorage.token) {
                authCxt.loadUser()
              }
              // setEmail(res.success.email);
            }
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
                    <h5>Change your Tinkoko Market place password</h5>
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
                    <p>
                      {email && (
                        <strong>
                          To change your old password for your account{" "}
                          <span className="text-dark">{email}</span> , please
                          enter your new password bellow{" "}
                        </strong>
                      )}
                    </p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        changeToNewPassword();
                      }}
                    >
                      <div className="form-field">
                        <label htmlFor="password">New password :</label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          required
                          onChange={(el) => setPassword(el.target.value)}
                        />
                        <label htmlFor="confirmpassword">
                          Confirm new password :
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="confirmpassword"
                          required
                          onChange={(el) => setConfirmPassword(el.target.value)}
                        />
                      </div>
                      <button type="submit">Change password</button>
                    </form>
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

export default ChangePassword;
