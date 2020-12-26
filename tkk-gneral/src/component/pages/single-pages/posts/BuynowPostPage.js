import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import addToCart from "../../../utils/addToCart";
import addToFavorite from "../../../utils/addToFavorite";
import removeFromFavorite from "../../../utils/removeFromFavorite";
import checkIsFavourited from "../../../utils/checkIsFavourited";
import Comments from "../Comments";
import Modal from "../Modal";
import { CartContext } from "../../../common/DropDownCart";
import { PostContext } from "./PostState";

const BuynowPostPage = (props) => {
  const urlid = useParams();
  const [postType, setPostType] = useState(null);
  const [postUrl, setPostUrl] = useState(null);
  const [postCategory, setPostCategory] = useState(null);
  const [post, setPost] = useState({});
  const [isFavourited, setIsFavourited] = useState(false);
  // const [toggleFavourite, setTogglFavourite] = useState(false);
  const cartCxt = useContext(CartContext);
  const postCxt = useContext(PostContext);
  useEffect(() => {
    setPostUrl(urlid[0]);
    setPostType("buynow");
    setPostCategory(props.match.params.category);
    setPostUrl(props.match.params.posturl);
    getPost();
  }, [postUrl]);

  useEffect(() => {
    console.log(isFavourited, "this is the favorited boolean");
  }, [isFavourited]);

  const getPost = () => {
    if (postUrl) {
      let apiEndpoint = `/api/posts/${postType}/${postCategory}/${postUrl}`;
      let xhr = new XMLHttpRequest();
      xhr.open("GET", apiEndpoint, true);
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (xhr.responseText) {
            const post = JSON.parse(xhr.responseText).success;
            if (post) {
              setPost(post);
              checkIsFavourited(postCxt.state.post._id, setIsFavourited);
              postCxt.setValue({ post });
              console.log(
                xhr.responseText,
                " all the response text available "
              );
            }
          }
        }
      };
      xhr.send();
    }
  };
  Modal();

  const toggleFavourite = async (post, _id) => {
    (await postCxt.state.post._id) && isFavourited
      ? removeFromFavorite(postCxt.state.post._id)
      : addToFavorite(
          postCxt.state.post._id,
          postCxt.state.post.post_price,
          postCxt.state.post.post_title,
          postCxt.state.post.post_images[[0]]
        );
    (await postCxt.state.post._id) &&
      checkIsFavourited(postCxt.state.post._id, setIsFavourited);
  };

  return (
    <>
      <section className="default-container">
        <div className="container">
          <div className="white-bg">
            <div className="row mb-2">
              <div className="col-md-9">
                <h4 className="bold-green-text">
                  {postCxt.state.post && postCxt.state.post.post_title}
                </h4>
                <p className="grey-text">
                  Posted on{" "}
                  <span>
                    {postCxt.state.post && postCxt.state.post.post_date}
                  </span>
                  ,{" "}
                  <span>
                    {postCxt.state.post.post_category &&
                      postCxt.state.post.post_category}
                  </span>{" "}
                  |{" "}
                  <span>
                    {postCxt.state.post.post_author_name &&
                      postCxt.state.post.post_author_name}
                    ,{" "}
                    {postCxt.state.post.post_state &&
                      postCxt.state.post.post_state}
                  </span>
                </p>
              </div>
              <div className="col-md-3">
                <div className="product-share-links">
                  <a href="#">
                    <i className="fa fa-share-alt-square"></i>Share
                  </a>
                  <a
                    href="#"
                    onClick={async (e) => {
                      e.preventDefault();
                      postCxt.state.post._id &&
                        (await toggleFavourite(
                          postCxt.state.post,
                          postCxt.state.post._id
                        ));
                    }}
                  >
                    <i
                      className={`fa fa-star checked ${
                        isFavourited && "text-warning"
                      }`}
                      style={{ cursor: "pointer" }}
                    ></i>
                    Favourite
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 left-part">
                <div className="product-image-slider">
                  <img
                    src={
                      postCxt.state.post.post_images &&
                      postCxt.state.post.post_images[0]
                    }
                    alt=""
                    id="featured"
                    className="img-fluid myImg image"
                  />
                  <div className="enlarge-icon" id="open">
                    <i className="fa fa-expand-arrows-alt"></i>
                  </div>
                  {/* <!-- Picture Modal --> */}
                  {/* product images carousel starts here  */}
                  <div id="myModal" className="images-modal">
                    <span className="close-modal">&times;</span>
                    <img className="modal-image" id="modalImg" />
                  </div>
                  <div id="slider-wrapper">
                    <i
                      className="fa fa-chevron-left slider-arrow"
                      id="arrowLeft"
                      onClick={(el) => {
                        let s = document.querySelector("#slider");
                        s.scrollLeft -= 180;
                      }}
                    ></i>
                    <div id="slider">
                      {postCxt.state.post.post_images &&
                        postCxt.state.post.post_images.map((img, key) => (
                          <img
                            key={key}
                            src={img}
                            alt=""
                            className="thumbnail image img-fluid"
                            onMouseOver={(e) => {
                              if (
                                !e.target.classList.contains("active-image")
                              ) {
                                e.target.classList.remove("active-image");
                                document.querySelector("#featured").src =
                                  e.target.src;
                              }
                            }}
                            onMouseOut={(e) => {
                              if (e.target.classList.contains("active-image")) {
                                e.target.classList.remove("active-image");
                              }
                            }}
                          />
                        ))}

                      {postCxt.state.post.post_video && (
                        <div className="product-video">
                          <video
                            webkit-playsinline
                            playsinline
                            data-video="../../mov_bbb.mp4"
                            src={postCxt.state.post.post_video}
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
                      onClick={(el) => {
                        let s = document.querySelector("#slider");
                        s.scrollLeft += 180;
                      }}
                    ></i>
                  </div>
                </div>

                {/* Product image carousel ends here */}
                <div className="product-price d-flex justify-content-between align-items-baseline flex-wrap flex-md-row flex-sm-column">
                  <p className="price">
                    &#8358;{" "}
                    {postCxt.state.post && postCxt.state.post.post_price}{" "}
                    {post && postCxt.state.post.post_distribution}
                  </p>
                  <p className="buy-now">
                    <i className="fa fa-truck mr-2"></i>Buy Now
                  </p>
                </div>
                <div className="product-description">
                  <h5>Description</h5>
                  <p>{post && postCxt.state.post.post_description}</p>
                </div>

                {post && <Comments post={postCxt.state.post} />}
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
                            Sold by{" "}
                            <span>
                              {postCxt.state.post.post_author_company}
                            </span>
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
                      {cartCxt.itemExist(postCxt.state.post._id) ? (
                        <a
                          href="/checkout"
                          className="chat-btn btn btn-success"
                        >
                          <i className="fa fa-shopping-cart"></i> Proceed To
                          Checkout
                        </a>
                      ) : (
                        <a
                          href="#"
                          className="chat-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            if (!cartCxt.itemExist(postCxt.state.post._id)) {
                              addToCart(
                                postCxt.state.post._id,
                                postCxt.state.post.post_price,
                                postCxt.state.post.post_title,
                                postCxt.state.post.post_images[0]
                              );
                              cartCxt.setValue({
                                cartItems: [
                                  ...cartCxt.state.cartItems,
                                  {
                                    id: postCxt.state.post._id,
                                    price: postCxt.state.post.post_price,
                                    title: postCxt.state.post.productTitle,
                                    image: postCxt.state.post.post_images[0],
                                  },
                                ],
                              });
                              cartCxt.setValue({
                                noOfCartItems:
                                  parseInt(cartCxt.state.noOfCartItems) + 1,
                              });
                            }
                          }}
                        >
                          <i className="fa fa-shopping-cart"></i>Add to Cart
                        </a>
                      )}
                    </div>
                    <a
                      href="buyers-buy-now-product-rating.html"
                      className="product-rating"
                    >
                      <span>
                        {[1, 2, 3, 4, 5].map((v, key) => (
                          <i
                            key={key}
                            className={`fa fa-star star ${
                              parseInt(postCxt.state.post.rating) >
                                parseInt(v) && "checked"
                            }`}
                          ></i>
                        ))}
                        {/* <i className="fa fa-star checked star"></i>
                        <i className="fa fa-star checked star"></i>
                        <i className="fa fa-star checked"></i>
                        <i className="fa fa-star star"></i>
                        <i className="fa fa-star star"></i> */}
                      </span>
                      <span className="light-green-text">
                        (
                        {!parseFloat(postCxt.state.post.rating)
                          ? 0
                          : parseFloat(postCxt.state.post.rating)}{" "}
                        ratings)
                      </span>
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

export default BuynowPostPage;
