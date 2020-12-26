import React from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../../common/Sidebar";

import productImg from "../../../images/product-image.PNG";
import PendingReview from "./PendingReview";
import AddReview from "./AddReview";
import ReviewState from "./ReviewState";

const Reviews = () => {
  return (
    <>
      <ReviewState>
        <section className="dashboard-section">
          <div className="container-fluid">
            <div className="row">
              {/* SIDE BAR HERE  */}
              <Sidebar />
              <div className="col-md-9">
                <div className="dashboard-main-content">
                  <Route
                    exact
                    component={PendingReview}
                    path="/buyer/pending-reviews"
                  />
                  <Route
                    exact
                    component={AddReview}
                    path="/buyer/pending-reviews/:orderid/:productid"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ReviewState>
    </>
  );
};

export default Reviews;
