import React, { useEffect, useState, useContext } from "react";
import { HomeContext } from "./HomeState";
import nairaFormartter from "../../utils/nairaFormartter";

import productIconImg from "../../../images/product-icon.PNG";
import dummyImg from "../../../images/dummy.PNG";
import advert1Img from "../../../images/advert-1.PNG";
import advert2Img from "../../../images/advert-2.PNG";
import advert3Img from "../../../images/advert-2.PNG";
import { AuthContext } from "../../context/authContext/AuthState";
import { Link } from "react-router-dom";
import isInViewport from "./IsInViewport";
import { plusSlides, currentSlide } from "../../utils/slider";
import AdsChecker from "./AdsChecker";

export const Home = () => {
  const authCxt = useContext(AuthContext);
  const homeCxt = useContext(HomeContext);
  const [searchText, setSearchText] = useState("");
  const [url, setUrl] = useState("/api/posts");

  useEffect(() => {
    homeCxt.getLocations(url);
    homeCxt.getCategories(url);
    homeCxt.getCountries(url);
    homeCxt.getProducts(url);
    homeCxt.getProducts(url);
    homeCxt.getJobs();
    homeCxt.getPromotedPosts(1);
    homeCxt.getAdvertisements(1);
    AdsChecker();
  }, [authCxt.token, url]);

  const postByQuery = (q = null) => {
    setUrl(`/api/posts${q}`);
  };
  const currencyFormat = (number) => {};
  return (
    <>
      <section className="homepage-section">
        <div className="container-fluid">
          <div className="homepage-white-bg">
            <div className="row homepage-search">
              <div className="col-md-12">
                <form action="" onSubmit={(el) => el.preventDefault()}>
                  <div className="form-row align-content-center align-items-center">
                    <div className="col-lg-3 col-md-6">
                      <label for="">Select Location</label>
                      <div className="form-field">
                        <i className="fa fa-map-marker-alt icon"></i>
                        <select
                          name="location"
                          id="location"
                          className="input-field"
                          onChange={(e) => {
                            postByQuery(`?region=${e.target.value}`);
                          }}
                        >
                          {homeCxt.state.regions &&
                            homeCxt.state.regions.map((region, key) => (
                              <option value={region.name} key={key}>
                                {region.name}
                              </option>
                            ))}
                        </select>
                        <i className="fa fa-chevron-down arrow-down"></i>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label for="category">Select Category</label>
                      <div className="form-field">
                        <i className="fa fa-tag icon"></i>
                        <select
                          name="category"
                          id="category"
                          className="input-field"
                          onChange={(e) => {
                            postByQuery(`?category=${e.target.value}`);
                          }}
                        >
                          {homeCxt.state.categories &&
                            homeCxt.state.categories.map((cat, key) => (
                              <option value={cat.name} key={key}>
                                {cat.name}
                              </option>
                            ))}
                        </select>
                        <i className="fa fa-chevron-down arrow-down"></i>
                      </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1 col-md-8">
                      <div className="form-field search-input">
                        <input
                          type="search"
                          name=""
                          id=""
                          placeholder="Search products, services, jobs, categories"
                          onChange={(el) => setSearchText(el.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-1 col-md-4">
                      <button
                        type="button"
                        onClick={() =>
                          homeCxt.getSearchResult("drinks", searchText)
                        }
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="row">
              <button id="homepageToggler" className="collapsible d-md-none">
                <span className="mr-3">
                  <i className="fa fa-bars"></i>
                </span>
                Toggle Products Filter{" "}
              </button>
              <div className="col-md-4 col-lg-3 homepage-filter d-md-block d-lg-block">
                <form action="">
                  <h6>Sort Results by:</h6>
                  <div className="form-field">
                    <select name="" id="">
                      <option value="">Date: Newest on Top</option>
                    </select>
                  </div>
                  <h6>Filter Posts by:</h6>
                  <div className="form-field">
                    <div className="single-checkbox">
                      <input
                        id="remember"
                        type="checkbox"
                        name="remember"
                        defaultChecked={true}
                      />
                      <label for="remember" className="quick-sales">
                        Quick Sales{" "}
                      </label>
                    </div>
                    <div className="single-checkbox">
                      <input id="tinkoko" type="checkbox" name="remember" />
                      <label for="tinkoko" className="grey-text">
                        <i className="fa fa-shipping-fast light-green-text"></i>{" "}
                        Buy now with Tinkoko
                      </label>
                    </div>
                  </div>
                  <h6>I want to see posts from:</h6>
                  <div className="form-field">
                    <input
                      type="radio"
                      name="type-of-post"
                      id="all"
                      defaultChecked={true}
                    />
                    <label for="all">All</label>
                    <input type="radio" name="type-of-post" id="members" />
                    <label for="members">Members</label>
                  </div>
                </form>
                {/* Sidebar categories starts here */}

                <div className="categories-filter">
                  <h6>Categories</h6>
                  <ul>
                    <li>
                      <a href="#">
                        <img
                          className="img-fluid"
                          src={productIconImg}
                          alt=""
                        />
                        All Categories
                      </a>
                    </li>
                    {homeCxt.state.categories &&
                      homeCxt.state.categories.map((cat, key) => (
                        <li key={key}>
                          <Link to="#">
                            <img
                              className="img-fluid"
                              src={productIconImg}
                              alt=""
                            />
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                {/* Sidebar categories starts here */}

                {/* sidebar countries starts here */}

                <div className="countries-filter">
                  <h6>Countries</h6>
                  <ul>
                    {homeCxt.state.countries &&
                      homeCxt.state.countries.map((country, key) => (
                        <li key={key}>
                          <a href="#">
                            <img
                              className="img-fluid"
                              src={productIconImg}
                              alt=""
                            />
                            {country.name}
                          </a>
                        </li>
                      ))}

                    {/* sidebar countries ends here */}
                  </ul>
                </div>
              </div>
              {/* Home content here  */}
              <div className="col-md-8 col-lg-9">
                <div className="homepage-container">
                  <div className="row">
                    <div className="col-md-12 col-lg-8 mb-4">
                      <h6>Home/Timeline</h6>

                      <div className="home-slider-menu mb-4">
                        <div className="slideshow-container">
                          {homeCxt.state.products &&
                            homeCxt.state.products
                              .slice(0, 3)
                              .map((post, key) => (
                                <>
                                  <div
                                    className="mySlides slide-in"
                                    style={{
                                      display: key === 0 ? "block" : "none",
                                    }}
                                  >
                                    <img src={post.post_images[0]} />
                                    {/* <img src="../images/dummy.PNG" /> */}
                                    <div className="bottom-text">
                                      <p className="category">
                                        {post.post_region} |{" "}
                                        {post.post_category}
                                      </p>
                                      <a
                                        href={`/posts/${post.post_type}/${post.post_category}/${post.post_url}`}
                                      >
                                        <h6 className="name">
                                          {post.post_title}
                                        </h6>
                                      </a>

                                      <p className="price">
                                        {post.post_price} / per{" "}
                                        {post.post_distribution}
                                      </p>
                                    </div>
                                  </div>
                                  <a
                                    className="prev"
                                    onClick={() => plusSlides(-1)}
                                  >
                                    &#10094;
                                  </a>
                                  <a
                                    className="next"
                                    onClick={() => plusSlides(1)}
                                  >
                                    &#10095;
                                  </a>
                                </>
                              ))}
                        </div>

                        {/* <!-- The dots/circles --> */}
                        <div style={{ textAlign: "center" }}>
                          {homeCxt.state.products &&
                            homeCxt.state.products
                              .slice(0, 3)
                              .map((s, key) => (
                                <span
                                  className="dot"
                                  onClick={() => currentSlide(key + 1)}
                                ></span>
                              ))}
                        </div>
                      </div>

                      {/* other product ex: buynow and regular sales bellow except joblisting */}
                      {/* promoted starts here  */}
                      <div className="other-products">
                        {homeCxt.state.promotedPosts &&
                          homeCxt.state.promotedPosts.map((p, key) => (
                            <div
                              className="promoted-product"
                              data-adid={p._id}
                              onScroll={(ev) => {
                                isInViewport(ev.target, p._id);
                              }}
                              key={key}
                              data-promoad={p._id}
                            >
                              <div className="row align-items-center">
                                <div className="col-md-5">
                                  <img
                                    className="img-fluid product-image"
                                    src={p.post_images[0]}
                                    alt=""
                                  />
                                </div>
                                <div className="col-md-7">
                                  <h4 className="product-name">
                                    <a
                                      href={`/posts/${p.post_type}/${p.post_category}/${p.post_url}`}
                                    >
                                      {p.post_title}
                                    </a>
                                  </h4>
                                  <div className="product-category d-flex justify-content-between align-items-baseline">
                                    <span className="member-tag">
                                      <i className="fa fa-star"></i>
                                      Member
                                    </span>
                                    <p>
                                      <span>{p.post_region}</span> |{" "}
                                      <span>{p.post_category}</span>{" "}
                                    </p>
                                  </div>
                                  <p className="negotiable">Negotiable</p>
                                  <div className="product-footer d-flex justify-content-between">
                                    <h5 className="price">
                                      &#8358;
                                      {nairaFormartter([p.post_price])}
                                    </h5>
                                    {/* {p.promoted_post && ( */}
                                      <span className="promoted">
                                        <i className="fa fa-trophy"></i>{" "}
                                        Promoted
                                      </span>
                                    {/* )} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                        {/* promoted post ends here  */}

                        {homeCxt.state.products &&
                          homeCxt.state.products.map((p, key) => (
                            <div className="normal-product">
                              <div
                                className="row align-items-center"
                                key={p._id}
                              >
                                <div className="col-md-5">
                                  <Link
                                    to={`/posts/${p.post_type}/${p.post_url}`}
                                  >
                                    <img
                                      className="img-fluid product-image"
                                      src={p.post_images[0]}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="col-md-7 align-content-center">
                                  <h4 className="product-name">
                                    <Link
                                      to={`/posts/${p.post_type}/${p.post_category}/${p.post_url}`}
                                    >
                                      {p.post_title}
                                    </Link>
                                  </h4>
                                  <div className="product-category d-flex justify-content-between align-items-baseline">
                                    {p.member && (
                                      <span className="member-tag">Member</span>
                                    )}
                                    <span className="promoted">
                                      <i className="fa fa-tag"></i>{" "}
                                      {p.post_type}
                                    </span>
                                    <p>
                                      <span>
                                        {p.post_country} {p.post_region}
                                      </span>{" "}
                                      | <span>{p.post_category}</span>{" "}
                                    </p>
                                  </div>
                                  <p className="negotiable">Negotiable</p>

                                  {p.promoted_post && (
                                      <span className="promoted">
                                        <i className="fa fa-trophy"></i>{" "}
                                        Promoted
                                      </span>
                                    )}
                                  <div className="product-footer d-flex justify-content-between">
                                    <h5 className="price">
                                      &#8358; {p.post_price}{" "} / per 
                                      {p.post_distribution}
                                    </h5>
                                    <span className="timestamp">
                                      {new Date(p.post_date).getHours() +
                                        " hours"}{" "}
                                      ago
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        {/* PAGINATION STARTS FROM HERE  */}
                        {/* <ul className="pagination">
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
                            <a href="#">...</a>
                          </li>

                          <li>
                            <a href="#" className="next-arrow">
                              Next <i className="fa fa-chevron-right"></i>
                            </a>
                          </li>
                        </ul> */}
                      </div>
                    </div>

                    <div className="col-md-12 col-lg-4 homepage-adverts">
                      <div className="hot-jobs">
                        <h6>HOT JOBS!</h6>
                        <ul>
                          {Array.isArray(homeCxt.state.jobs) &&
                            homeCxt.state.jobs.map((job, key) => (
                              <li key={key}>
                                <a
                                  href={`/posts/${job.post_type}/${job.post_category}/${job.post_url}`}
                                >
                                  {job.post_title}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="advert-images">
                        {homeCxt.state.advertisements &&
                          homeCxt.state.advertisements.map((ad, key) => (
                            <img
                              className="img-fluid first-advert created-ad"
                              data-adid={ad._id}
                              src={ad.image[0]}
                              // height={ad.adtype[0].height}
                              // width={ad.adtype[0].width}
                              alt=""
                              key={key}
                            />
                          ))}
                        {/* <img
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
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
