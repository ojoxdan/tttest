import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/authContext/AuthState";
import { AlertContext } from "../context/alertContext/AlertState";

function Login(props) {
  const authCxt = useContext(AuthContext);
  const alertCxt = useContext(AlertContext)
  const { userLogin, loadUser, isAuthenticated } = authCxt;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      
      // props.history.push(`/`);
      window.location= '/'
    }
    //eslint-disable-next-line
    
  }, [isAuthenticated, authCxt.token,props.history]);
  const validateFields = () => {
    if (email) {
      if (password) {
        const userData = {
          uemail: email,
          upwd: password,
        };
        userLogin(userData);
      }
    }
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
                    <h5>Login to Tinkoko Market place</h5>
                    <p>Welcome back! Continue where you left off</p>
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
                    <form onSubmit={(e)=>{
                      e.preventDefault()
                      validateFields()
                    }}>
                      <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          onChange={(el) => setEmail(el.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="password">Password: </label>
                        <span>
                          <a href="/auth/forgotten-password" className="forgot-password">
                            Forgot Password?
                          </a>
                        </span>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          required
                          onChange={(el) => setPassword(el.target.value)}
                        />
                      </div>
                      <button type="submit">Login</button>
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

export default Login;
