import React from 'react'
import Sidebar from '../common/Sidebar'

import productImg from '../../../images/product-image.PNG'
const BuyerTest = () => {
    return (
<>
    <section className="dashboard-section">
        <div className="container-fluid">
            <div className="row">
               {/* SIDE BAR HERE  */}
               <Sidebar />
                <div className="col-md-9">
                    <div className="dashboard-main-content">
                        <div className="content-header">
                            <h4 className="yellow-text">Orders (18)</h4>
                        </div>

                        <div className="orders">
                            <div className="single-order">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <img className="img-fluid" src={productImg} alt=""/>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="order-title-and-details d-flex justify-content-between flex-wrap flex-lg-row flex-md-row flex-sm-column">
                                            <h5>50 bags sunflowers kernels</h5>
                                            <a href="buyer-order-details.html">SEE DETAILS</a>
                                        </div>
                                        <div className="ordered-date">
                                            <p>Placed on 21-01-2020</p>
                                        </div>
                                        <div className="order-status">
                                            <p className="delivered"><i className="fa fa-check-double"></i> delivered on 24-02-2020</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="single-order">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <img className="img-fluid" src={productImg} alt=""/>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="order-title-and-details d-flex justify-content-between flex-wrap flex-lg-row flex-md-row flex-sm-column">
                                            <h5>50 bags sunflowers kernels</h5>
                                            <a href="buyer-order-details.html">SEE DETAILS</a>
                                        </div>
                                        <div className="ordered-date">
                                            <p>Placed on 21-01-2020</p>
                                        </div>
                                        <div className="order-status">
                                            <p className="refunded">refund completed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="single-order">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <img className="img-fluid" src={productImg} alt=""/>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="order-title-and-details d-flex justify-content-between flex-wrap flex-lg-row flex-md-row flex-sm-column">
                                            <h5>50 bags sunflowers kernels</h5>
                                            <a href="buyer-order-details.html">SEE DETAILS</a>
                                        </div>
                                        <div className="ordered-date">
                                            <p>Placed on 21-01-2020</p>
                                        </div>
                                        <div className="order-status">
                                            <p className="cancelled">CANCELLED</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="single-order">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <img className="img-fluid" src={productImg} alt=""/>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="order-title-and-details d-flex justify-content-between flex-wrap flex-lg-row flex-md-row flex-sm-column">
                                            <h5>50 bags sunflowers kernels</h5>
                                            <a href="buyer-order-details.html">SEE DETAILS</a>
                                        </div>
                                        <div className="ordered-date">
                                            <p>Placed on 21-01-2020</p>
                                        </div>
                                        <div className="order-status">
                                            <p className="delivered"><i className="fa fa-check-double"></i> delivered on 24-02-2020</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="single-order">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <img className="img-fluid" src={productImg} alt=""/>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="order-title-and-details d-flex justify-content-between flex-wrap flex-lg-row flex-md-row flex-sm-column">
                                            <h5>50 bags sunflowers kernels</h5>
                                            <a href="buyer-order-details.html">SEE DETAILS</a>
                                        </div>
                                        <div className="ordered-date">
                                            <p>Placed on 21-01-2020</p>
                                        </div>
                                        <div className="order-status">
                                            <p className="refunded">refund completed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</>
    )
}

export default BuyerTest
