import React, { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import Footer from "../../../common/Footer";
import Header from "../../../common/Header";
import profileImg from "../../../../images/user-profile.PNG";
import addToCart from "../../../utils/addToCart";
import addToFavorite from "../../../utils/addToFavorite";
import getCartItems from "../../../utils/getCartItems";
import removeFromFavorite from "../../../utils/removeFromFavorite";
import checkIsFavourited from "../../../utils/checkIsFavourited";
import Comments from "../Comments";
import Modal from "../Modal";

function RegularPostPage(props) {
  const urlid = useParams();
  const [postUrl, setPostUrl] = useState(null);
  const [postType, setPostType] = useState(null);
  const [postCategory, setPostCategory] = useState(null);
  const [post, setPost] = useState({});
  const [isFavourited, setIsFavourited] = useState(false);
  const [contact, setContact] = useState("Show Contact");
  useEffect(() => {
    setPostType("regular");
    setPostCategory(props.match.params.category);
    setPostUrl(props.match.params.posturl);
    getPost();
    // addToFavorite()
  }, [postUrl]);

  const getPost = () => {
    if (postUrl) {
      console.log("before the xhr and response text ");
      let apiEndpoint = `/api/posts/${postType}/${postCategory}/${postUrl}`;
      let xhr = new XMLHttpRequest();
      xhr.open("GET", apiEndpoint, true);
      xhr.onload = () => {
        console.log(xhr.responseText, "the xhr here ");
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (xhr.responseText) {
            const post = JSON.parse(xhr.responseText).success;
            if (post) {
              setPost(post);
              checkIsFavourited(post._id, setIsFavourited);
              console.log(xhr.responseText, "just hte exact post ");
            }
          }
        }
      };
      xhr.send();
    }
  };
  Modal();

  const toggleFavourite = async (post, _id) => {
    (await post._id) && isFavourited
      ? removeFromFavorite(post._id)
      : addToFavorite(
          post._id,
          post.post_price,
          post.post_title,
          post.post_images[[0]]
        );
    (await post._id) && checkIsFavourited(post._id, setIsFavourited);
  };

  const startChat = async (post, fav) => {
    if (!fav) {
      post._id && (await toggleFavourite(post, post._id));
    }
  };

  return (
    <>
      <section className="default-container">
        <div className="container">
          <div className="white-bg">
            <div className="row mb-4">
              <div className="col-md-9">
                <h4 className="bold-green-text">{post && post.post_title}</h4>
                <p className="grey-text">
                  Posted on <span>{post && post.post_date}</span>,
                  <span>Tools and Machinery</span> | <span>Karimo, Abuja</span>
                </p>
              </div>
              <div className="col-md-3">
                <div className="product-share-links">
                  <a href="#">
                    <i className="fa fa-share-alt-square"></i>Share
                  </a>
                  {post._id && (
                    <>
                      <span
                        onClick={async () => {
                          post._id && (await toggleFavourite(post, post._id));
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className={`fa fa-star checked ${
                            isFavourited && "text-warning"
                          }`}
                        ></i>
                        Favourite
                      </span>
                    </>
                  )}
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
                  <div className="promoted-tag">
                    <i className="fa fa-trophy"></i> Promoted
                  </div>
                  {/* <!-- Picture Modal --> */}
                  <div id="myModal" className="images-modal">
                    <span className="close-modal">&times;</span>
                    <img className="modal-image" id="modalImg" />
                  </div>
                  <div id="slider-wrapper">
                    <i
                      className="fa fa-chevron-left slider-arrow"
                      id="arrowLeft"
                    ></i>
                    <div id="slider">
                      {post.post_images &&
                        post.post_images.map((img, key) => (
                          <img
                            key={key}
                            src={img}
                            alt=""
                            className="thumbnail img-fluid image"
                            onMouseOver={(el) => {
                              let featured = document.querySelector(
                                "img#featured"
                              );
                              if (featured) {
                                featured.src = img                                
                              }
                            }}
                          />
                        ))}
                      {post.post_video && (
                        <div className="product-video">
                          <video
                            webkit-playsinline
                            playsinline
                            data-video={post.post_video}
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
                    ></i>
                  </div>
                </div>
                <div className="product-price d-flex justify-content-start align-items-baseline flex-wrap flex-md-row flex-sm-column">
                  <p className="price">
                    &#8358; {post.post_price && post.post_price} /{" "}
                    {post.distribution && post.distribution}
                  </p>
                  <p className="bold-green-text pl-3">Negotiable</p>
                </div>
                <div className="product-description">
                  <h5>Description</h5>
                  <p>{post.post_description && post.post_description}</p>
                </div>
                <Comments post={post} />
              </div>

              <div className="col-md-4 right-part">
                <div className="product-seller-details">
                  <div className="padded-area">
                    <h6 className="grey-text text-center mb-3">
                      For sale by{" "}
                      <span>
                        {post.user_info && post.user_info.businessName}
                      </span>
                    </h6>
                    <span className="member-tag">
                      <i className="fa fa-star"></i> Member
                    </span>
                    <img
                      src={profileImg}
                      alt=""
                      className="img-fluid seller-profile-picture"
                    />
                    <div className="join-last-seen text-center d-flex justify-content-around">
                      <div className="join">
                        <p className="grey-text font-weight-bold">Joined</p>
                        <p className="yellow-text">
                          {post.user_info && post.user_info.dateRegistered}
                        </p>
                      </div>
                      <div className="last-seen">
                        <p className="grey-text font-weight-bold">Last Seen</p>
                        <p className="yellow-text">
                          {post.user_info && post.user_info.lastSeen}
                        </p>
                      </div>
                    </div>
                    <div className="product-seller-contact">
                      <a
                        href="#"
                        className="contact-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setContact(post.post_author_phone);
                        }}
                      >
                        <i className="fa fa-phone-volume"></i>
                        {contact}
                      </a>
                      <a
                        href={`/buyer/t-messenger?pid=${post._id}`}
                        className="chat-btn"
                        onClick={async () => {
                          startChat(post, isFavourited);
                        }}
                      >
                        <i className="fa fa-envelope"></i>Start Chat
                      </a>
                    </div>
                    <div className="stay-safe-on-tinkoto mb-4">
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

          <div className="row mt-5 similar-products">
            <div className="col-md-12">
              <div className="slider-menu mb-4">
                <h4 className="grey-text pl-3 font-weight-bold mb-2">
                  Similar Products
                </h4>
                <hr />
                <div className="slideshow-container">
                  <div className="mySlides slide-in">
                    <div className="row">
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mySlides slide-in">
                    <div className="row">
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mySlides slide-in">
                    <div className="row">
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="single-product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid"
                                src="../../images/similar-product.PNG"
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>Corn mill machine and...</h4>
                              <p>Tools and Machinery | Karimo, Abuja</p>
                              <h6>&#8358; 380,500 / Negotiable</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Next and previous buttons --> */}
                  <a className="prev" onclick="plusSlides(-1)">
                    &#10094;
                  </a>
                  <a className="next" onclick="plusSlides(1)">
                    &#10095;
                  </a>
                </div>
                {/* <!-- The dots/circles --> */}
                <div style={{ textAlign: "center" }}>
                  <span className="dot" onclick="currentSlide(1)"></span>
                  <span className="dot" onclick="currentSlide(2)"></span>
                  <span className="dot" onclick="currentSlide(3)"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegularPostPage;
