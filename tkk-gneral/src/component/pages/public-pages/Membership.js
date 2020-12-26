import React from 'react'
import ResourceSidebar from '../../common/ResourceSidebar'

const Membership = () => {
    return (
        <>

    <section class="default-container">
      <div class="container">
        <div class="white-bg">
          <div class="row mb-4">
            <div class="col-md-8 offset-md-2 text-center">
              <h3 class="bold-green-text mb-2">
                Tinkoko Resources and Support Center
              </h3>
              <p class="grey-text">
                Increase your sales with a Tinkoko Membership! Membership allows
                your business to have a bigger presence on Tinkoko, so that you
                can reach even more customers. Our membership package is
                speciﬁcally designed to give you the tools you need to expand
                your business and increase your sales.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
              <ResourceSidebar />
                <div class="col-md-7 offset-md-1">
                  <h4 class="bold-green-text mb-3">Benefits of Membership</h4>
                  <div class="row mb-4 membership-feature">
                    <div class="col-md-3">
                      <img src="../images/file.PNG" alt="" class="img-fluid" />
                    </div>
                    <div class="col-md-9">
                      <h4 class="bold-green-text">
                        Personalised shop on Tinkoko
                      </h4>
                      <p class="grey-text">
                        Get a page dedicated entirely to your business,
                        including beautiful photos, your business details and
                        all of your ads in one place. With membership, users can
                        search for products directly in your shop.
                      </p>
                    </div>
                  </div>
                  <div class="row mb-4 membership-feature">
                    <div class="col-md-9">
                      <h4 class="bold-green-text">Promote more products</h4>
                      <p class="grey-text">
                        Our Membership packages allow you to post an unlimited
                        number of promotions. The more you post, the more you
                        sell!
                      </p>
                    </div>
                    <div class="col-md-3 order-first order-md-last">
                      <img src="../images/file.PNG" alt="" class="img-fluid" />
                    </div>
                  </div>
                  <div class="row mb-4 membership-feature">
                    <div class="col-md-3">
                      <img src="../images/file.PNG" alt="" class="img-fluid" />
                    </div>
                    <div class="col-md-9">
                      <h4 class="bold-green-text">
                        Post ads that do not expire
                      </h4>
                      <p class="grey-text">
                        Our membership package allows you to renew your ads
                        automatically so that they don’t have to expire.
                      </p>
                    </div>
                  </div>
                  <div class="row mb-4 membership-feature">
                    <div class="col-md-9">
                      <h4 class="bold-green-text">
                        Access to all promotion types
                      </h4>
                      <p class="grey-text">
                        Promotion types such as product sliders, top ads
                        Promotions are reserved for members only
                      </p>
                    </div>
                    <div class="col-md-3 order-first order-md-last">
                      <img src="../images/file.PNG" alt="" class="img-fluid" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <a
                        href="../seller-general/click-link-to-register-as-tinkoko-member/membership-enrolment.html"
                        class="signup-membership"
                        >Sign up for Tinkoko Membership today!
                      </a>
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
    )
}

export default Membership
