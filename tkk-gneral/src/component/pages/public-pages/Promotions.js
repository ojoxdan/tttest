import React from "react";
import ResourceSidebar from "../../common/ResourceSidebar";

const Promotions = () => {
  return (
    <>

      <section class="default-container">
        <div class="container">
          <div class="white-bg">
            <div class="row mb-4">
              <div class="col-md-8 offset-md-2 text-center">
                <h3 class="bold-green-text mb-2">
                  Boost your products and sell faster on Tinkoko
                </h3>
                <p class="grey-text">
                  A popular marketplace like Tinkoko has thousands of buyers and
                  sellers - so how can you make your products stand out and
                  reach even farther?
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                <ResourceSidebar />
                  <div class="col-md-7 offset-md-1 advertising">
                    <div class="row">
                      <div class="col-md-12">
                        <img
                          class="img-fluid green-graph"
                          src="../images/green-graph.PNG"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-4">
                        <img
                          src="../images/featured.PNG"
                          alt=""
                          class="img-fluid mb-3"
                        />
                      </div>
                      <div class="col-md-8">
                        <h4 class="bold-green-text">Promoted products</h4>
                        <p>
                          At the top of every timeline category page, there will
                          be promoted products listed. By promoting your ad, you
                          get you get a chance for your product to be displayed
                          in one of these spot, which can get you 10x more views
                          and engagements.
                        </p>
                        <p>Benefits</p>
                        <p>
                          * Promoted ads stand out - they are presented
                          differently from a normal posts, they are highlighted
                          in yellow, and clearly marked as a promoted.
                        </p>
                        <p>
                          * Each promoted product is given an equal chance of
                          being shown in the top spot. Promoted products are
                          sponsored for two weeks (14 days).
                        </p>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-4 order-first order-md-last">
                        <img
                          src="../images/hero.PNG"
                          alt=""
                          class="img-fluid mb-3"
                        />
                      </div>
                      <div class="col-md-8">
                        <h4 class="bold-green-text">Hero products</h4>
                        <p>
                          Hero products slider is a premium spot for showcasing
                          your high-value items and getting immediate attention
                          from buyers. To get the most value out of this
                          promotion, make sure you add great-looking photos
                          while posting normally.
                        </p>
                        <p>Benefits</p>
                        <p>
                          * They are visually appealing - with big images and
                          clean design to attract more views.
                        </p>
                        <p>
                          * Each product is given an equal chance of being shown
                          in this premium spot, with ﬁve (5) products being
                          shown automatically to every user.
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

export default Promotions;
