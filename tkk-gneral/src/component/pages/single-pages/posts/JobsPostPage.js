import React, { useState, useEffect, useContext } from "react";
import Comments from "../Comments"

import addToFavorite from "../../../utils/addToFavorite";
import removeFromFavorite from "../../../utils/removeFromFavorite";
import checkIsFavourited from "../../../utils/checkIsFavourited";
import { PostContext } from "./PostState";

const JobsPostPage = (props) => {
  const postCxt =useContext(PostContext)
  const [postUrl, setPostUrl] = useState(null);
  const [postType, setPostType] = useState(null);
  const [postCategory, setPostCategory] = useState(null);
  const [post, setPost] = useState({});
  const [isFavourited, setIsFavourited] = useState(false);

  useEffect(() => {
    setPostType("jobs");
    setPostCategory(props.match.params.category);
    setPostUrl(props.match.params.posturl);
    getPost();
    // addToFavorite()
  }, [postUrl]);

  const toggleFavourite = async (post, _id) => {
    (await post._id) && isFavourited
      ? removeFromFavorite(post._id)
      : addToFavorite(
          post._id,
          post.job_salary,
          post.post_title,
          post.post_images[[0]]
        );
    (await post._id) && checkIsFavourited(post._id, setIsFavourited);
  };

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
              checkIsFavourited(post._id, setIsFavourited);
              postCxt.setValue({post})
              setPost(post);
            }
          }
        }
      };
      xhr.send();
    }
  };
  return (
    <>
      <section className="default-container">
        <div className="container">
          <div className="white-bg">
            <div className="row mb-2">
              <div className="col-md-9">
                <h4 className="bold-blue-text">
                  {post._id && post.post_title}
                </h4>
                <p className="grey-text">
                  Posted on <span>{post._id && post.post_title}</span>,
                  <span>Factory Worker</span> |
                  <span className="font-weight-bold">{post._id && post.post_author_name}, {post._id && post.post_region}</span>
                </p>
              </div>
              <div className="col-md-3">
                <div className="product-share-links">
                <a
                    href="#"
                    onClick={async (e) => {
                      e.preventDefault()
                      post._id && (await toggleFavourite(post, post._id));
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
                  {post._id && (
                    <img
                      src={post.post_images[0]}
                      alt=""
                      id="featured"
                      className="img-fluid myImg image"
                    />
                  )}
                  <div className="enlarge-icon" id="open">
                    <i className="fa fa-expand-arrows-alt"></i>
                  </div>
                  {/* <!-- Picture Modal --> */}
                  <div id="myModal" className="images-modal">
                    <span className="close-modal">&times;</span>
                    <img className="modal-image" id="modalImg" />
                  </div>
                </div>
                {post._id && (
                  <div className="other-job-information mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          Business industry:{" "}
                          <span>{post.business_industry}</span>
                        </p>
                        <p>
                          Business function:{" "}
                          <span>{post.business_function}</span>
                        </p>
                        <p>
                          Minimum qualification:{" "}
                          <span>{post.job_qualification}</span>
                        </p>
                        <p>
                          Education specialisation:{" "}
                          <span>{post.job_education_specialization}</span>
                        </p>
                        <p>
                          Maximum age: <span>{post.max_age}</span>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          Job type: <span>{post.job_type}</span>
                        </p>
                        <p>
                          Role/Designation: <span>{post.job_role}</span>
                        </p>
                        <p>
                          Years of experience: <span>{post.years_of_experience}</span>
                        </p>
                        <p>
                          Skills: <span>{post.skills}</span>
                        </p>
                        <p>
                          Gender preference: <span>{post.gender}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="product-description">
                  <h5>Job Description</h5>
                  <p>{post._id && post.post_description}</p>
                </div>

                  <Comments post={postCxt.state.post} />
              </div>

              <div className="col-md-4 right-part">
                <div className="hot-jobs-for-you">
                  <h5 className="hot-jobs-header">Hot Jobs For You</h5>
                  <div className="padded-area">
                    <div className="media">
                      <i className="fa fa-warehouse"></i>
                      <div className="media-body">
                        <p>
                          Sold by <span>Akenteng Group of Companies</span>
                        </p>
                      </div>
                    </div>

                    <div className="apply-for-this-job">
                      <button
                        className="apply-button"
                        data-toggle="modal"
                        data-target="#apply-standard"
                      >
                        Apply For this Job (Standard)
                      </button>
                      <button
                        className="apply-button"
                        data-toggle="modal"
                        data-target="#apply-advanced"
                      >
                        Apply For this Job (Advanced)
                      </button>
                      <div
                        className="modal standard-application fade text-center"
                        id="apply-standard"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="apply-standard"
                        aria-hidden="true"
                      >
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-body">
                              <h6>Apply for this Job</h6>
                              <h5>
                                Call <span>Akenteng Group of Companies</span> to
                                apply
                              </h5>
                              <button className="phone-button">
                                <i className="fa fa-phone-volume icon"></i>
                                08123456789
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="modal advanced-application fade"
                        id="apply-advanced"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="apply-advanced"
                        aria-hidden="true"
                      >
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <div
                          className="modal-dialog modal-lg modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-body">
                              <h6>Apply for this Job</h6>
                              <p>
                                Fill in the following fields to apply for this
                                job(All required)
                              </p>
                              <form action="" className="mt-4">
                                <div className="form-field">
                                  <label for="fullname">Full Name</label>
                                  <input
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                  />
                                </div>
                                <div className="form-row">
                                  <div className="col-md-6">
                                    <div className="form-field">
                                      <label for="email">Email</label>
                                      <input
                                        type="email"
                                        name="email"
                                        id="email"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-field">
                                      <label for="dob">Date of Birth</label>
                                      <input type="date" name="dob" id="dob" />
                                      <i className="fa fa-calendar-alt icon"></i>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-field">
                                      <label for="location">Location</label>
                                      <input
                                        type="text"
                                        name="location"
                                        id="location"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-field">
                                      <label for="yearsoflocation">
                                        Years of Experience
                                      </label>
                                      <input
                                        type="text"
                                        name="yearsofexperience"
                                        id="yearsofexperience"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-field">
                                      <label for="currentsalary">
                                        Current Salary
                                      </label>
                                      <input
                                        type="text"
                                        name="currentsalary"
                                        id="currentsalary"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-field">
                                      <label for="highesteducationlevel">
                                        Location
                                      </label>
                                      <input
                                        type="text"
                                        name="highesteducationlevel"
                                        id="locatiohighesteducationlevel"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-field">
                                      <label for="currentbusinessfunction">
                                        Current Business Function
                                      </label>
                                      <input
                                        type="text"
                                        name="currentbusinessfunction"
                                        id="currentbusinessfunction"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-field">
                                      <label>Attach CV</label>
                                      <label
                                        for="attachedcv"
                                        className="custom-file-upload"
                                      >
                                        <i className="fa fa-plus"></i>
                                        Upload File (Max Size 5mb)
                                      </label>
                                      <input
                                        type="file"
                                        name="attachedcv"
                                        id="attachedcv"
                                      />
                                      <div className="help-text">
                                        Supported Formats: DOC, DOCX, PDF, JPG,
                                        PNG
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button type="submit">
                                  Submit Application
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="salary text-center">
                      <h6>Salary</h6>
                      <p>
                      {post._id && JSON.parse( post.job_salary).from} - {post._id && JSON.parse( post.job_salary).to}{" "}
                        <span className="d-block">(monthly)</span>
                      </p>
                    </div>

                    <div className="application-deadline text-center">
                      <h6>Application Deadline</h6>
                <p>{post._id && post.job_application_deadline}</p>
                    </div>

                    <div className="stay-safe-on-tinkoko mb-4">
                      <p className="yellow-text text-center">
                        <i className="fa fa-shield-alt mr-3"></i>Stay Safe on
                        Tinkoko Market
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
};

export default JobsPostPage;
