import React from "react";
import ResourceSidebar from "../../common/ResourceSidebar";

const StaySafe = () => {
  return (
    <>
      <section class="default-container">
        <div class="container">
          <div class="white-bg">
            <div class="row mb-4">
              <div class="col-md-8 offset-md-2 text-center">
                <h3 class="bold-green-text mb-2">Stay safe on Tinkoko</h3>
                <p class="grey-text">
                  At Tinkoko, we are 100% committed to making sure that your
                  experience on our site is as safe as possible. Here you can
                  ﬁnd advice on how to stay safe whilst trading on our platform.
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                <ResourceSidebar />
                  <div class="col-md-7 offset-md-1 stay-safe">
                    <div class="row mb-4">
                      <div class="col-md-12 grey-text">
                        <h4 class="mb-2">General safety advice</h4>
                        <div class="row">
                          <div class="col-md-10">
                            <p>
                              Keep things local: For products which are handles
                              and fulﬁlled by sellers, meet the seller in
                              person, check the item and make sure you are
                              satisﬁed with it before you make a payment. Where
                              available, use doorstep Delivery and have items
                              delivered to you directly.
                            </p>
                            <p>
                              Exchange item and payment at the same time. Buyers
                              – don’t make any payments before receiving an
                              item. Sellers – don’t send an item before
                              receiving payment
                            </p>
                            <p>
                              Use common sense. Avoid anything that appears too
                              good to be true, such as unrealistically low
                              prices and promises of quick money.
                            </p>
                            <p>
                              Never give out ﬁnancial information. This includes
                              bank account details, BVN or Bank or bank cards
                              info, and any other information that could be
                              misused
                            </p>
                            <p>
                              Alternatively, shop for products tagged “Buy Now
                              with Tinkoko” to have the orders Handled and
                              fulﬁlled by Tinkoko Market.
                            </p>
                          </div>
                          <div class="col-md-2 order-first order-md-last">
                            <img
                              src="../images/shield.PNG"
                              alt=""
                              class="img-fluid mb-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-12 grey-text">
                        <h4 class="mb-2">Scams and frauds to watch out for</h4>
                        <div class="row">
                          <div class="col-md-10">
                            <p>
                              Fake information requests. Tinkoko will never ask
                              you for your password or personal Details through
                              any email. If you receive an email from us asking
                              for any personal details, we recommend that you
                              contact us directly via phone or open a support
                              ticket to communicate your details and avoid
                              potential scams.
                            </p>
                            <p>
                              Fake fee requests. Avoid anyone that ask for extra
                              fees to buy or sell an item or service. Tinkoko
                              will never requests payments for its basic
                              services that are free
                            </p>
                            <p>
                              Requests to use money transfer services such as
                              Western Union or MoneyGram. These services are not
                              meant for transactions between strangers and many
                              scams are run through them. Avoid requests to use
                              these services. Requests to use money transfer
                              services such as Western Union or MoneyGram. These
                              services are not meant for transactions between
                              strangers and many scams are run through them.
                              Avoid requests to use these services.
                            </p>
                          </div>
                          <div class="col-md-2 order-first order-md-last">
                            <img
                              src="../images/scam-alert.PNG"
                              alt=""
                              class="img-fluid mb-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-12 grey-text">
                        <h4 class="mb-2">Tinkoko’s safety measures</h4>
                        <p>
                          We work continuously to ensure you have a safe,
                          enjoyable experience on Tinkoko market place. Our
                          safety measures include:
                        </p>
                        <p>
                          * Hiding your email address on ads you post to protect
                          you from spam.
                        </p>
                        <p>
                          * Giving you the option to hide your phone number on
                          ads you post to protect you from spam.
                        </p>
                        <p>
                          * Making constant improvements to our technology to
                          detect and prevent suspicious or inappropriate
                          activity behind the scenes.
                        </p>
                        <p>
                          * Tracking reports of suspicious or illegal activity
                          to prevent offenders from using the site again.
                        </p>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-12 grey-text">
                        <h4 class="mb-2">
                          Reporting a safety issue or a product
                        </h4>
                        <p>
                          If you feel that you have been the victim of a scam,
                          please report your situation to us immediately. If you
                          have been cheated, we also recommend that you contact
                          your local police department. Report the product
                          immediately if you have been treated poorly by a
                          seller or a product didn’t turn out how It was
                          presented on the platform.
                        </p>
                        <p>
                          Tinkoko market is committed to ensuring the privacy of
                          its users and therefore does not share information
                          about its users publicly. However, we are committed to
                          the safety of our users and will cooperate with the
                          police department should we receive any requests for
                          information in connection with fraudulent or other
                          criminal activity.
                        </p>
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

export default StaySafe;
