import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import addToCart from "../../utils/addToCart";
import getCartItems from "../../utils/getCartItems";
import Comments from "./Comments";
import Modal from "./Modal";

const SingleProduct = () => {
  const urlid = useParams();
  const [postUrl, setPostUrl] = useState(null);
  const [post, setPost] = useState({});
  useEffect(() => {
    setPostUrl(urlid[0]);
    getPost();
  }, [postUrl]);

  const getPost = () => {
    if (postUrl) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "/api/buyer/buy-now-products/" + postUrl, true);
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (xhr.responseText) {
            const post = JSON.parse(xhr.responseText).success;
            if (post) {
              setPost(post);
            }
          }
        }
      };
      xhr.send();
    }
  };
  Modal()
  

  
  return (
    <>
      <section className="default-container">
        <div className="container">
          <div className="white-bg">
            <div className="row mb-2">
              <div className="col-md-9">
                <h4 className="bold-green-text">{post && post.post_title}</h4>
                <p className="grey-text">
                  Posted on <span>{post && post.post_date}</span>,{" "}
                  <span>{post.post_category && post.post_category}</span>{" "} | {" "}
                  <span>
                    {post.post_author_name && post.post_author_name},{" "}
                    {post.post_state && post.post_state}
                  </span>
                </p>
              </div>
              <div className="col-md-3">
                <div className="product-share-links">
                  <a href="#">
                    <i className="fa fa-share-alt-square"></i>Share
                  </a>
                  <a href="#">
                    <i className="fa fa-star"></i>Favourite
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 left-part">
                <div className="product-image-slider">
                  <img
                    src={post.post_images && post.post_images[0]}
                    alt=""
                    id="featured"
                    className="img-fluid myImg image"
                  />
                  <div className="enlarge-icon" id="open">
                    <i className="fa fa-expand-arrows-alt"></i>
                  </div>
                  {/* <!-- Picture Modal --> */}
                  {/* product images carousel starts here  */}
                  <div id="myModal" className="images-modal" >
                    <span className="close-modal">&times;</span>
                    <img className="modal-image" id="modalImg" />
                  </div>
                  <div id="slider-wrapper">
                    <i
                      className="fa fa-chevron-left slider-arrow"
                      id="arrowLeft"
                      onClick={(el=>{
                        let s = document.querySelector('#slider')
                        s.scrollLeft -= 180
                      })}
                    ></i>
                    <div id="slider">
                      {post.post_images &&
                        post.post_images.map((img, key) => (
                          <img
                            key={key}
                            src={img}
                            alt=""
                            className="thumbnail image img-fluid"
                            onMouseOver={(e)=>{
                              if (!e.target.classList.contains('active-image')) {
                                e.target.classList.remove('active-image')
                                document.querySelector("#featured").src = e.target.src
                              }
                            }}
                            onMouseOut={(e)=>{
                              if (e.target.classList.contains('active-image')) {
                                e.target.classList.remove('active-image')
                              }
                            }}
                          />
                        ))}

                      {post.post_video && (
                        <div className="product-video">
                          <video
                            webkit-playsinline
                            playsinline
                            data-video="../../mov_bbb.mp4"
                            src={post.post_video}
                            type="video/mp4"
                            id="video"
                            className="video"
                          >
                            <source />
                            Your browser does not support HTML5 video.
                          </video>
                          <i className="fa fa-play play-video"></i>
                        </div>
                      )}
                    </div>
                    <i
                      className="fa fa-chevron-right slider-arrow"
                      id="arrowRight"
                      onClick={(el=>{
                        let s = document.querySelector('#slider')
                        s.scrollLeft += 180
                      })}
                    ></i>
                  </div>
                </div>

                {/* Product image carousel ends here */}
                <div className="product-price d-flex justify-content-between align-items-baseline flex-wrap flex-md-row flex-sm-column">
                  <p className="price">
                    &#8358; {post && post.post_price}{" "}
                    {post && post.post_distribution}
                  </p>
                  <p className="buy-now">
                    <i className="fa fa-truck mr-2"></i>Buy Now
                  </p>
                </div>
                <div className="product-description">
                  <h5>Description</h5>
                  <p>{post && post.post_description}</p>
                </div>

                {post && <Comments post={post} />}
              </div>

              <div className="col-md-4 right-part">
                <div className="product-seller-details">
                  <h5 className="buy-with-tinkoko">Buy Now with Tinkoko</h5>
                  <div className="padded-area">
                    <p className="yellow-text text-center font-italic mb-4">
                      Order online and get products delivered to you by Tinkoko
                    </p>
                    <div className="product-seller-info">
                      <div className="row">
                        <div className="col-md-6 mb-3 border-side">
                          <i className="fa fa-warehouse icon yellow-text"></i>
                          <p className="light-green-text">
                            Sold by <span>Akenteng Group of Companies</span>
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <i className="fa fa-shield-alt icon light-green-text"></i>
                          <p className="grey-text">
                            Speed through our secured online payments
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="product-seller-contact">
                      <Link
                        className="chat-btn"
                        onClick={() =>
                          addToCart(
                            post._id,
                            post.post_price,
                            post.productTitle,
                            post.post_images[0]
                          )
                        }
                      >
                        <i className="fa fa-shopping-cart"></i>Add to Cart
                      </Link>
                    </div>
                    <a
                      href="buyers-buy-now-product-rating.html"
                      className="product-rating"
                    >
                      <span>
                        <i className="fa fa-star checked star"></i>
                        <i className="fa fa-star checked star"></i>
                        <i className="fa fa-star checked"></i>
                        <i className="fa fa-star star"></i>
                        <i className="fa fa-star star"></i>
                      </span>
                      <span className="light-green-text">(24 ratings)</span>
                    </a>
                    <div className="stay-safe-on-tinkoko mb-4">
                      <p className="light-green-text text-center mb-3">
                        <i className="fa fa-truck mr-3"></i>Delivered within 2 -
                        5 days
                      </p>
                      <p className="yellow-text text-center">
                        <i className="fa fa-shield-alt mr-3"></i>Stay Safe on
                        Tinkoko
                      </p>
                    </div>
                    <div className="report-abuse">
                      <a href="#">
                        <i className="fa fa-flag"></i>Report Abuse
                      </a>
                    </div>
                    <div className="adverts-section">
                      <img
                        className="img-fluid"
                        src="../../images/advert-1.PNG"
                        alt=""
                      />
                      <img
                        className="img-fluid"
                        src="../../images/advert-2.PNG"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

{/* <SimilarProduct /> */}
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
