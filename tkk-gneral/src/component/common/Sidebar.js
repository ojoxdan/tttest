import React, { useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext/AuthState";
import userProfileImg from "../../images/user-profile.PNG";

const Sidebar = (props) => {
  const authCxt = useContext(AuthContext);

  useEffect(() => {
    indicateActiveUrl();
  }, []);

  const indicateActiveUrl = () => {
    let currentPage = window.location.pathname;
    let sidediv = document.querySelector(".dashboard-sidebar");
    if (sidediv) {
      let sidelinks = sidediv.querySelectorAll("a");
      if (sidelinks) {
        console.log(sidelinks, "the links ");
        sidelinks.forEach((a) => {
          if (RegExp(a.pathname).test(currentPage)) {
            a.classList.add("active");
            console.log("hello now active");
          }
        });
      }
    }
  };

  return (
    <div className="col-md-3">
      <button id="dashboard-navigation" className="collapsible d-md-none">
        <span className="mr-3">
          <i className="fa fa-bars"></i>
        </span>
        Dashboard Navigation
      </button>
      <div className="dashboard-sidebar d-md-block d-lg-block">
        <div className="seller-info text-center">
          <img className="img-fluid" src={userProfileImg} alt="" />
          <h5>
            {authCxt.user && authCxt.user.firstName}{" "}
            {authCxt.user && authCxt.user.lastName}
          </h5>
          <h6 className="font-weight-bold">{authCxt.user && authCxt.user.email}
          </h6>
        </div>
        <div className="dashboard-sidebar-links">
          <ul>
            <li>
              <Link to="/buyer/buy-now-purchases" className="">
                <i className="fa fa-shopping-basket"></i> Buy Now Purchases
              </Link>
            </li>
            <li>
              <Link to="/buyer/pending-reviews">
                <i className="fa fa-receipt"></i> Pending Reviews
              </Link>
            </li>
            <li>
              <Link to="/buyer/favorites">
                <i className="fa fa-star"></i> Favorites
              </Link>
            </li>
            <li>
              <Link to="/buyer/voucher-credits">
                <i className="fa fa-percentage"></i> Voucher Credits
              </Link>
            </li>
            <li>
              <Link to="/buyer/support">
                <i className="fa fa-comment-dots"></i> Support
              </Link>
            </li>
            <li>
              <Link to="/buyer/settings">
                <i className="fa fa-cog"></i> Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
