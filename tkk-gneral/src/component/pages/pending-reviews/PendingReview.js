import React, { Fragment } from "react";
import productImg from "../../../images/product-image.PNG";
import { useContext } from "react";
import { ReviewContext } from "./ReviewState";
import { useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthState";

const PendingReview = () => {
  const authCxt = useContext(AuthContext);
  const prCxt = useContext(ReviewContext);
  useEffect(() => {
    if (authCxt.token) {
      prCxt.getOrders(authCxt.token);
      console.log(prCxt, " the review rating context");
    }
  }, [authCxt.token]);
  return (
    <>
      <div className="content-header">
        <h4 className="yellow-text">
          Pending Reviews ({prCxt.state.orders.length})
        </h4>
      </div>

      <div className="pending-reviews">
        {prCxt.state.orders &&
          prCxt.state.orders.map((o, key) => (
            <Fragment key={key}>
                <div className="single-order">
                  <div className="row">
                    <div className="col-lg-3">
                      <img
                        className="img-fluid"
                        src={`${o.post_images[0]}`}
                        alt=""
                      />
                    </div>
                    <div className="col-lg-9">
                      <div className="order-title-and-details d-flex justify-content-between flex-wrap flex-lg-row flex-md-row flex-sm-column">
                        <h5>{o.post_title}</h5>
                        <a
                          href={`/buyer/pending-reviews/${o._id}/${o._id}`}
                        >
                          RATE THIS PRODUCT
                        </a>
                      </div>
                      <div className="order-status">
                        <p className="delivered">
                          <i className="fa fa-check-double"></i>{" "}
                          {o.order_status} on {o.date_delivered}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            </Fragment>
          ))}

        {/* <!-- PAGINATION AREA --> */}
        <div className="col-md-12 mt-4 text-center">
          <ul className="products-pagination">
            <li>
              <a href="#">
                <i className="fa fa-fast-backward"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-step-backward"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-step-forward"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-fast-forward"></i>
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- END PAGINATION --> */}
      </div>
    </>
  );
};

export default PendingReview;
