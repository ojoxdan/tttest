import React from "react";
import { ReviewContext } from "./ReviewState";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthState";

export const AddReview = (props) => {
  const authCxt = useContext(AuthContext);
  const prCxt = useContext(ReviewContext);
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");
  const [order, setOrder] = useState([]);
  const [title, setTitle] = useState(null);
  const [detail, setDetail] = useState(null);
  const [name, setName] = useState(null);
  const [stars, setStars] = useState(0);
  const [] = useState(null);
  useEffect(() => {
    setOrderId(props.match.params.orderid);
    setProductId(props.match.params.productid);
    if (authCxt.token) {
      singleOrder(authCxt.token);
    }
  }, [authCxt.token]);
  const singleOrder = (token) => {
    if (!orderId && !productId) {
      return;
    }
    let ur = `/api/buyer/orders/${orderId}/${productId}`;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", ur, true);
    xhr.onload = () => {
      if (xhr.responseText) {
        if (JSON.parse(xhr.responseText)) {
          let res = JSON.parse(xhr.responseText);
          let success = res.success;
          if (success) {
            setOrder(res.success);
            console.log(success, " trying to add the review now  ");
            console.log(order, " for the orders now   ");
          }
        }
      }
    };
    xhr.setRequestHeader("x-auth-user", token);
    xhr.send();
  };

  const submitReview = () => {
    if (name && title && detail && orderId && productId && stars) {
      let dataForm = new FormData();
      dataForm.append("username", name);
      dataForm.append("title", title);
      dataForm.append("detail", detail);
      dataForm.append("orderid", orderId);
      dataForm.append("postid", productId);
      dataForm.append("stars", stars);

      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/buyer/reviews", true);
      xhr.onload = () => {
        console.log(
          xhr.responseText,
          " this should be the 400 resoponse from the backend "
        );
        if (xhr.status === 200 && xhr.readyState === 4) {
          if (xhr.responseText) {
            if (JSON.parse(xhr.responseText)) {
              let res = JSON.parse(xhr.responseText);
              console.log(
                res,
                "The review response text this should be the success message "
              );
            }
          }
        }
      };
      xhr.setRequestHeader("x-auth-user", authCxt.token);
      xhr.send(dataForm);
    }
  };

  return (
    <div class="dashboard-main-content">
      <div class="content-header">
        <h4 class="yellow-text">
          <a href="buyers-profile-view-pending-review.html">
            <i class="fa fa-arrow-alt-circle-left"></i>
            Rate and Review
          </a>
        </h4>
      </div>
      <div class="add-review-container">
        <form action="">
          <p class="select-stars">SELECT THE STARS TO RATE THE PRODUCT</p>
          <div class="select-star-rating mb-4 d-flex align-content-center justify-content-start align-items-center flex-wrap flex-md-row flex-lg-row">
            {order.length > 0 &&
              order[0].post[0] &&
              order[0].post[0].post_images && (
                <img src={`${order[0].post[0].post_images[0]}`} alt="" />
              )}
            <div class="starability-growRotate">
              <input
                type="radio"
                id="no-rate"
                class="input-no-rate"
                name="rating"
                value="0"
                checked
                aria-label="No rating."
              />
              <input
                type="radio"
                id="rate1"
                name="rating"
                value="1"
                onClick={(e) => {
                  setStars(parseInt(e.target.value));
                }}
              />
              <label
                for="rate1"
                data-id="rate1"
                onClick={(e) => {
                  let input = document.querySelector(`#${e.target.dataset.id}`);
                  if (input) {
                    input.click();
                  }
                }}
              >
                1 star.
              </label>

              <input
                type="radio"
                id="rate2"
                name="rating"
                value="2"
                onClick={(e) => {
                  setStars(parseInt(e.target.value));
                }}
              />
              <label
                for="rate2"
                data-id="rate2"
                onClick={(e) => {
                  let input = document.querySelector(`#${e.target.dataset.id}`);
                  if (input) {
                    input.click();
                  }
                }}
              >
                2 stars.
              </label>

              <input
                type="radio"
                id="rate3"
                name="rating"
                value="3"
                onClick={(e) => {
                  setStars(parseInt(e.target.value));
                }}
              />
              <label
                for="rate3"
                data-id="rate3"
                onClick={(e) => {
                  let input = document.querySelector(`#${e.target.dataset.id}`);
                  if (input) {
                    input.click();
                  }
                }}
              >
                3 stars.
              </label>

              <input
                type="radio"
                id="rate4"
                name="rating"
                value="4"
                onClick={(e) => {
                  setStars(parseInt(e.target.value));
                }}
              />
              <label
                for="rate4"
                data-id="rate4"
                onClick={(e) => {
                  let input = document.querySelector(`#${e.target.dataset.id}`);
                  if (input) {
                    input.click();
                  }
                }}
              >
                4 stars.
              </label>

              <input
                type="radio"
                id="rate5"
                name="rating"
                value="5"
                onClick={(e) => {
                  setStars(parseInt(e.target.value));
                }}
              />
              <label
                for="rate5"
                data-id="rate5"
                onClick={(e) => {
                  let input = document.querySelector(`#${e.target.dataset.id}`);
                  if (input) {
                    input.click();
                  }
                }}
              >
                5 stars.
              </label>

              <span class="starability-focus-ring"></span>
            </div>
          </div>
          <p class="leave-a-review">Leave a review about this product</p>
          <div class="form-row">
            <div class="col-md-6">
              <div class="form-field">
                <label for="review-title">Review Title</label>
                <input
                  type="text"
                  name="review-title"
                  id="review-title"
                  placeholder="e.g. Healthy vegetable / Poorly packaged"
                  onChange={(el) => setTitle(el.target.value)}
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-field">
                <label for="your-name">Your Name</label>
                <input
                  type="text"
                  name="your-name"
                  id="your-name"
                  // value="Buyer Doe"
                  onChange={(el) => setName(el.target.value)}
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-field">
                <label for="detailed-review">Detailed Review</label>
                <textarea
                  name="detailed-review"
                  id="detailed-review"
                  cols="30"
                  rows="8"
                  onChange={(el) => setDetail(el.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <button type="button" onClick={(e) => submitReview()}>
            Submit your review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
