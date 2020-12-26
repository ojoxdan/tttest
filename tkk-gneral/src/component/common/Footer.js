import React from "react";
import AlertResponse from "../alert/AlertResponse";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-4">
              <h4 className="footer-header">
                The Largest Agro Social Commerce Platform
              </h4>
              <p className="intro-message">
                Buy & Sell your agricultural products With ease, connect
                directly with various merchants, producers on the Value chain.
              </p>
              <h6 className="connect-with-us">
                Connect with Us :{" "}
                <span className="pl-1">
                  <a href="#">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter-square"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </span>
              </h6>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-4">
              <h4 className="footer-header">Resources</h4>
              <ul>
                <li>
                  <a href="/resource/how-to-sell">How to Sell</a>
                </li>
                <li>
                  <a href="/resource/buynow">Buy Now</a>
                </li>
                <li>
                  <a href="/resource/membership">Membership</a>
                </li>
                <li>
                  <a href="/resource/tinkoko-logistics">Tinkoko Logistics</a>
                </li>
                <li>
                  <a href="/resource/promotions">Promotions</a>
                </li>
                <li>
                  <a href="/resource/advertising">Advertising</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-4">
              <h4 className="footer-header">Support</h4>
              <ul>
                <li>
                  <a href="/resource/faq">FAQs</a>
                </li>
                <li>
                  <a href="/resource/stay-safe">Stay Safe</a>
                </li>
                <li>
                  <a href="/resource/tickets">Tickets</a>
                </li>
                <li>
                  <a href="/resource/contact">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-xs-6 mb-4">
              <h4 className="footer-header">Quick Links</h4>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Seller Terms</a>
                </li>
              </ul>
            </div>
            <div className="col-md-12 border-top pt-3">
              <p className="copyright">
                Copyright &copy; 2020 Tinkoko Global Services Limited
              </p>
            </div>
          </div>
        </div>
      </section>
      <AlertResponse />
    </>
  );
};

export default Footer;
