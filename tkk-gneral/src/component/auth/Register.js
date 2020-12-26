import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext/AuthState";
import { AlertContext } from "../context/alertContext/AlertState";
import { errorBorder } from "../utils/errorBorder";

const Register = (props) => {
  const authCxt = useContext(AuthContext);
  const { Register } = authCxt;
  const {loadUser, isAuthenticated } = authCxt;

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confrimPassword, setConfirmPassword] = useState(null);
  const [businessName, setBusinessName] = useState(null);
  const [businessAdress, setBusinessAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [terms, setTerms] = useState(false);
  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      // props.history.push("/");
      window.location= '/'
    }
  }, [isAuthenticated, authCxt.token,props.history])

  const validateFields = () => {
    const userData = {
      fname: firstName,
      lname: lastName,
      phone,
      utype: userType,
      pwd: password,
      cpwd: confrimPassword,
      email,
      cemail: confirmEmail,
      bname: businessName,
      baddress: businessAdress,
      city,
      state,
      country,
      terms,
    };

    if (firstName) {
      if (lastName) {
        if (phone) {
          if (userType) {
            if (email) {
              if (confirmEmail) {
                if (password) {
                  if (confrimPassword) {
                    if (businessName) {
                      if (businessAdress) {
                        if (city) {
                          if (state) {
                            if (country) {
                              if (terms) {
                                Register(userData);
                              } else {
                                errorBorder(
                                  "#agreement",
                                  "Sorry you need to accept our terms and condition before you can proceed"
                                );
                              }
                            } else {
                              errorBorder("#country", "Set your country");
                            }
                          } else {
                            errorBorder("#state", "Set your state");
                          }
                        } else {
                          errorBorder("#city", "Set your City");
                        }
                      }else{
                        errorBorder("#businessaddress", "Enter your business address")
                      }
                    }else{
                      errorBorder("#businessname", "Enter business name");

                    }
                  } else {
                    errorBorder("#confirmpassword", "Please make sure your password matches");
                  }
                } else {
                  errorBorder("#password", "Confirm password");
                }
              } else {
                errorBorder("#confirmemail", "Confirm your email address");
              }
            } else {
              errorBorder("#email", "Enter your email address ");
            }
          } else {
            errorBorder("#usertype", "Set user type");
          }
        } else {
          errorBorder("#phone", "Enter your phone number");
        }
      } else {
        errorBorder("#lastname", "Enter last name");
      }
    } else {
      errorBorder("#firstname", "Enter your first name");
    }
  };

  return (
    <>
      <section className="default-container">
        <div className="container">
          <div className="col-md-12">
            <div className="register-container">
              <div className="row">
                <div className="col-md-6 left-part pt-lg-5">
                  <div className="register-header">
                    <h5>Getting started on Tinkoko</h5>
                    <p>
                      Register to access the largest market place for Thousands
                      of agro-products from different merchants
                    </p>
                  </div>
                  <div className="register-adverts">
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
                  <div className="register-form">
                    <h3 className="grey-text mt-3 mb-4 font-weight-bold">
                      Tinkoko Registration
                    </h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validateFields();
                      }}
                    >
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-field">
                            <label htmlFor="firstname">
                              First Name:{" "}
                              <span className="required-field">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstname"
                              id="firstname"
                              required
                              onChange={(el) => setFirstName(el.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-field">
                            <label htmlFor="lastname">
                              Last Name span:{" "}
                              <span className="required-field">*</span>
                            </label>
                            <input
                              type="text"
                              name="lastname"
                              id="lastname"
                              required
                              onChange={(el) => setLastName(el.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-field">
                            <label htmlFor="phone">
                              Phone: <span className="required-field">*</span>
                            </label>
                            <input
                              type="number"
                              name="phone"
                              id="phone"
                              required
                              onChange={(el) => setPhone(el.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-field" id="usertype">
                            <input
                              type="radio"
                              name="type-of-account"
                              value="seller"
                              id="seller"
                              onChange={(el) => setUserType(el.target.value)}
                            />
                            <label htmlFor="seller">Register as Seller</label>
                            <input
                              type="radio"
                              name="type-of-account"
                              value="buyer"
                              id="buyer"
                              onChange={(el) => setUserType(el.target.value)}
                            />
                            <label htmlFor="buyer">Register as Buyer</label>
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-field">
                            <label htmlFor="email">
                              Email: <span className="required-field">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              required
                              onChange={(el) => setEmail(el.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-field">
                            <label htmlFor="confirmemail">
                              Confirm Email:{" "}
                              <span className="required-field">*</span>
                            </label>
                            <input
                              type="email"
                              name="confirmemail"
                              id="confirmemail"
                              required
                              onChange={(el) =>
                                setConfirmEmail(el.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-field">
                            <label htmlFor="password">
                              Password:{" "}
                              <span className="required-field">*</span>
                            </label>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              required
                              onChange={(el) => setPassword(el.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-field">
                            <label htmlFor="confirmpassword">
                              Confirm Password:{" "}
                              <span className="required-field">*</span>
                            </label>
                            <input
                              type="password"
                              name="confirmpassword"
                              id="confirmpassword"
                              required
                              onChange={(el) =>
                                setConfirmPassword(el.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-12">
                          <div className="form-field">
                            <label htmlFor="businessname">
                              Business Name:{" "}
                              <span className="required-field">*</span>
                            </label>
                            <input
                              type="text"
                              name="businessname"
                              id="businessname"
                              required
                              onChange={(el) =>
                                setBusinessName(el.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-field">
                            <label htmlFor="businessaddress">
                              Business Address:{" "}
                              <span className="required-field">*</span>
                            </label>
                            <input
                              type="text"
                              name="businessaddress"
                              id="businessaddress"
                              required
                              onChange={(el) =>
                                setBusinessAddress(el.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-field">
                            <label htmlFor="city">
                              City: <span className="required-field">*</span>
                            </label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              required
                              onChange={(el) => setCity(el.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-field">
                            <label htmlFor="state">
                              State: <span className="required-field">*</span>
                            </label>
                            <input
                              type="text"
                              name="state"
                              id="state"
                              required
                              onChange={(el) => setState(el.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-12">
                          <div className="form-field">
                            <label htmlFor="country">
                              Country <span className="required-field">*</span>
                            </label>
                            <select
                              name="country"
                              id="country"
                              required
                              onChange={(el) => setCountry(el.target.value)}
                            >
                              <option value="" selected>
                                Select a Country
                              </option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="South Africa">South Africa</option>
                              <option value="Ghana">Ghana</option>
                            </select>
                            <i className="fa fa-chevron-down arrow-down"></i>
                          </div>
                        </div>
                      </div>

                      <div className="checkbox-field">
                        <input
                          type="checkbox"
                          name="agreement"
                          id="agreement"
                          className="checkbox"
                          required
                          onChange={(el) => setTerms(!terms)}
                        />
                        <label htmlFor="agreement" className="label">
                          I have read and accepted terms & content agreement
                        </label>
                      </div>
                      <button
                        className="bg-success border p-2 "
                        style={{ fontSize: "18px", color: "#fff" }}
                        onClick={validateFields}
                      >
                        Submit
                      </button>
                    </form>

                    <div className="already-have-an-account text-right">
                      <a href="/login" className="login-btn">
                        Already have an account? Login Instead
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
};

export default Register;
