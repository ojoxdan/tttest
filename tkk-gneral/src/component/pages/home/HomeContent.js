import React from 'react'
import productImage from "../../../images/product-image.PNG";
import dummyImg from "../../../images/dummy.PNG";
import advert1Img from "../../../images/advert-1.PNG";
import advert2Img from "../../../images/advert-2.PNG";
import advert3Img from "../../../images/advert-2.PNG";

const HomeContent = () => {
    return (

        <div className="col-md-8 col-lg-9">
        <div className="homepage-container">
          <div className="row">
            <div className="col-md-12 col-lg-8 mb-4">
              <h6>Home/Timeline</h6>
              <div className="home-slider-menu mb-4">
                <div className="slideshow-container">
                  <div className="mySlides slide-in">
                    <img src="../images/dummy.PNG" />
                    <div className="bottom-text">
                      <p className="category">
                        Plateau | Category Name
                      </p>
                      <h6 className="name">
                        Bags to Fresh Pepper For Sale
                      </h6>
                      <p className="price">N2,800 - N3,500 / per bag</p>
                    </div>
                  </div>
                  <div className="mySlides slide-in">
                    <img src="../images/dummy.PNG" />
                    <div className="bottom-text">
                      <p className="category">
                        Plateau | Category Name
                      </p>
                      <h6 className="name">
                        Bags to Fresh Pepper For Sale
                      </h6>
                      <p className="price">N2,800 - N3,500 / per bag</p>
                    </div>
                  </div>
                  <div className="mySlides slide-in">
                    <img src="../images/dummy.PNG" />
                    <div className="bottom-text">
                      <p className="category">
                        Plateau | Category Name
                      </p>
                      <h6 className="name">
                        Bags to Fresh Pepper For Sale
                      </h6>
                      <p className="price">N2,800 - N3,500 / per bag</p>
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
                  <span
                    className="dot"
                    onclick="currentSlide(1)"
                  ></span>
                  <span
                    className="dot"
                    onclick="currentSlide(2)"
                  ></span>
                  <span
                    className="dot"
                    onclick="currentSlide(3)"
                  ></span>
                </div>
              </div>

              <div className="other-products">
                <div className="promoted-product">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <img
                        className="img-fluid product-image"
                        src={productImage}
                        alt=""
                      />
                    </div>
                    <div className="col-md-7">
                      <h4 className="product-name">
                        <a href="normal-product.html">
                          Bags to Fresh Pepper
                        </a>
                      </h4>
                      <div className="product-category d-flex justify-content-between align-items-baseline">
                        <span className="member-tag">
                          <i className="fa fa-star"></i>
                          Member
                        </span>
                        <p>
                          <span>Plateau</span> |{" "}
                          <span>Category Name</span>{" "}
                        </p>
                      </div>
                      <p className="negotiable">Negotiable</p>
                      <div className="product-footer d-flex justify-content-between">
                        <h5 className="price">
                          &#8358; 2,800 - &#8358; 3,000 per bag
                        </h5>
                        <span className="promoted">
                          <i className="fa fa-trophy"></i> Promoted
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="promoted-product">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <img
                        className="img-fluid product-image"
                        src={productImage}
                        alt=""
                      />
                    </div>
                    <div className="col-md-7 align-content-center">
                      <h4 className="product-name">
                        <a href="normal-product.html">
                          Tonnes of Maize
                        </a>
                      </h4>
                      <div className="product-category d-flex justify-content-between align-items-baseline">
                        <span className="member-tag">Member</span>
                        <p>
                          <span>Plateau</span> |{" "}
                          <span>Category Name</span>{" "}
                        </p>
                      </div>
                      <div className="product-footer d-flex justify-content-between">
                        <h5 className="price">
                          &#8358; 45,000 per Basket
                        </h5>
                        <span className="promoted">
                          <i className="fa fa-trophy"></i> Promoted
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="normal-product">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <img
                        className="img-fluid product-image"
                        src={productImage}
                        alt=""
                      />
                    </div>
                    <div className="col-md-7 align-content-center">
                      <h4 className="product-name">
                        <a href="buynow-product.html">
                          Tonnes of Maize
                        </a>
                      </h4>
                      <div className="product-category">
                        <p>
                          <span>Plateau</span> |{" "}
                          <span>Category Name</span>{" "}
                        </p>
                      </div>
                      <div className="buy-now-tag text-right">
                        <span className="buy-now">
                          <i className="fa fa-trophy"></i> Buy Now
                        </span>
                      </div>
                      <div className="product-footer d-flex justify-content-between">
                        <h5 className="price">
                          &#8358; 2,800 - &#8358; 3,500
                        </h5>
                        <span className="timestamp">2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="normal-product">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <img
                        className="img-fluid product-image"
                        src={productImage}
                        alt=""
                      />
                    </div>
                    <div className="col-md-7 align-content-center">
                      <h4 className="product-name">
                        <a href="normal-product.html">
                          Tonnes of Maize
                        </a>
                      </h4>
                      <div className="product-category d-flex justify-content-between align-items-baseline">
                        <span className="member-tag">Member</span>
                        <p>
                          <span>Rivers</span> |{" "}
                          <span>Category Name</span>{" "}
                        </p>
                      </div>
                      <p className="negotiable">Negotiable</p>
                      <div className="product-footer d-flex justify-content-between">
                        <h5 className="price">
                          &#8358; 2,800 - &#8358; 3,500 per Acre
                        </h5>
                        <span className="timestamp">3 minutes ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="pagination">
                  <li>
                    <a href="#" className="prev-arrow">
                      <i className="fa fa-chevron-left"></i>Previous{" "}
                    </a>
                  </li>

                  <li>
                    <a href="#" className="active">
                      1
                    </a>
                  </li>

                  <li>
                    <a href="#">2</a>
                  </li>

                  <li>
                    <a href="#">3</a>
                  </li>

                  <li>
                    <a href="#">4</a>
                  </li>

                  <li>
                    <a href="#">5</a>
                  </li>

                  <li>
                    <a href="#">6</a>
                  </li>

                  <li>
                    <a href="#">7</a>
                  </li>

                  <li>
                    <a href="#">8</a>
                  </li>

                  <li>
                    <a href="#">9</a>
                  </li>

                  <li>
                    <a href="#">10</a>
                  </li>

                  <li>
                    <a href="#">...</a>
                  </li>

                  <li>
                    <a href="#" className="next-arrow">
                      Next <i className="fa fa-chevron-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-12 col-lg-4 homepage-adverts">
              <div className="hot-jobs">
                <h6>HOT JOBS!</h6>
                <ul>
                  <li>
                    <a href="#">Farm Workers</a>
                  </li>
                  <li>
                    <a href="#">Hulticulturists</a>
                  </li>
                  <li>
                    <a href="#">Managers / Supervisors</a>
                  </li>
                </ul>
              </div>

              <div className="advert-images">
                <img
                  className="img-fluid first-advert"
                  src={dummyImg}
                  alt=""
                />
                <img
                  className="img-fluid second-advert"
                  src={advert1Img}
                  alt=""
                />
                <img
                  className="img-fluid third-advert"
                  src={advert2Img}
                  alt=""
                />
                <img
                  className="img-fluid fourth-advert"
                  src={advert3Img}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default HomeContent
