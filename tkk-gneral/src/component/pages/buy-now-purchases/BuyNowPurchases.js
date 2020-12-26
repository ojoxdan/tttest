import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Orders from "./Orders";

import { useContext } from "react";
import { BuyNowContext } from "./BuyNowState";
import { AuthContext } from "../../context/authContext/AuthState";
import OrderDetails from "./OrderDetails";
import TrackOrder from "./TrackOrder";

const BuyNowPurchases = () => {
  const bnCxt = useContext(BuyNowContext);
  const authCxt = useContext(AuthContext);
  return (
    <>
      <section className="dashboard-section">
        <div className="container-fluid">
          <div className="row">
            {/* SIDE BAR HERE  */}
            <Sidebar />
            <div className="col-md-9">
              <div className="dashboard-main-content">
                {/* Starts her  */}
                <Route
                  exact
                  component={Orders}
                  path="/buyer/buy-now-purchases/orders"
                />
                <Route
                  exact
                  component={OrderDetails}
                  path="/buyer/buy-now-purchases/orders/:orderid"
                />
                <Route
                  exact
                  component={TrackOrder}
                  path="/buyer/buy-now-purchases/orders/:orderid/:trackingnumber"
                />
                {/* Stops here */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BuyNowPurchases;
