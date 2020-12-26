import React from "react";
import ResourceSidebar from "../../common/ResourceSidebar";

const Advertising = () => {
  return (
    <>
      <section class="default-container">
        <div class="container">
          <div class="white-bg">
            <div class="row mb-4">
              <div class="col-md-8 offset-md-2 text-center">
                <h3 class="bold-green-text mb-2">
                  Advertise your brand on Tinkoko
                </h3>
                <p class="grey-text">
                  While the basic service of posting a product remains free on
                  Tinkoko, we now offer extra options for businesses who want to
                  reach new customers quickly and easily. With our banner
                  advertising opportunities, you can target local customers
                  directly and advertise your packaged products or branded goods
                  efﬁciently.
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <ResourceSidebar />
                  <div class="col-md-7 offset-md-1">
                    <h4 class="bold-green-text text-center mb-4">
                      Advertising for Agro Products
                    </h4>
                    <div class="row mb-4">
                      <div class="col-md-12 grey-text">
                        <h4>Leaderboard Adverts</h4>
                        <p>
                          Strategically positioned above the navigation bar on
                          Mobile and below on Desktop, the Leaderboard is viewed
                          by practically every visitor of the site. A great
                          choice for building brand awareness for everyone or in
                          speciﬁc categories.
                        </p>
                        <div class="row">
                          <div class="col-md-9">
                            <h6>Dimensions on Desktop: 970 x 90 px</h6>
                            <h6>Dimensions on Mobile: 320 x 50 px</h6>
                            <img
                              src="../images/dummy.PNG"
                              alt=""
                              class="img-fluid"
                            />
                          </div>
                          <div class="col-md-3 mt-lg-5">
                            <img
                              src="../images/desktop-tablet.PNG"
                              alt=""
                              class="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-12 grey-text">
                        <h4>Skyscraper</h4>
                        <p class="text-right">
                          The Skyscraper is a cost-efﬁcient placement on our
                          search results page, with high reach. A good option
                          for brand building.
                        </p>
                        <div class="row">
                          <div class="col-md-9 order-md-last order-first text-right">
                            <h6>Dimensions on Desktop: 160 x 300 px</h6>
                            <img
                              src="../images/skyscraper.PNG"
                              alt=""
                              class="img-fluid"
                            />
                          </div>
                          <div class="col-md-3 mt-lg-5">
                            <img
                              src="../images/desktop-only.PNG"
                              alt=""
                              class="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-12 grey-text">
                        <h4>Footer Banner</h4>
                        <p>
                          Just like the leaderboard banner, this banner is
                          placed before the footer section of pages.
                        </p>
                        <div class="row">
                          <div class="col-md-9">
                            <h6>Dimensions on Desktop: 970 x 90 px</h6>
                            <img
                              src="../images/dummy.PNG"
                              alt=""
                              class="img-fluid"
                            />
                          </div>
                          <div class="col-md-3 mt-lg-5">
                            <img
                              src="../images/desktop-tablet.PNG"
                              alt=""
                              class="img-fluid"
                            />
                          </div>
                        </div>
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

export default Advertising;
