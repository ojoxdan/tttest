import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext/AuthState";
import { DropDownCart } from "./DropDownCart";

const Header = () => {
  const authCxt = useContext(AuthContext);
  useEffect(() => {
  }, [authCxt.token, authCxt.user]);
  return (
    <header>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
          <a className="navbar-brand" href="/">
            Tinkoko
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="fa fa-bars"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {authCxt.user && (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-a" href={`/${authCxt.user.userType}`}>
                    Timeline
                  </a>
                </li>
              </ul>
            )}
            <ul className="navbar-nav ml-auto">
              {/* cart drop down box  */}
              <DropDownCart />
              {authCxt.token ? (
                <>
                  <li className="bell-icon">
                    <a href={`/${authCxt.user.userType}/notifications`}>
                      <i className="fa fa-bell"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={`/${authCxt.user.userType}/t-messenger`}>
                      <span className="messenger-icon">
                        <i className="fa fa-comment-alt"></i>
                      </span>{" "}
                      T-Messenger
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-user"></i> My Account
                    </a>
                    <div
                      className="dropdown-menu "
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item" href={`/${authCxt.user.userType}/profile`}>
                        Profile
                      </a>
                      <a className="dropdown-item" href={`/${authCxt.user.userType}/settings`}>
                        Settings
                      </a>
                      <a className="dropdown-item" href={`/${authCxt.user.userType}/support`}>
                        Support
                      </a>
                      <a className="dropdown-item" href={`/${authCxt.user.userType}/favourites`}>
                        Favorites
                      </a>
                      <a className="dropdown-item" href="#"
                        onClick={(el)=>{
                          el.preventDefault()
                          authCxt.Logout()
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  </li>
                </>
              ) : (
                <a
                  className="nav-link"
                  href="/login"
                  style={{ color: "#fff", fontSize: "18px" }}
                >
                  Login
                </a>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
