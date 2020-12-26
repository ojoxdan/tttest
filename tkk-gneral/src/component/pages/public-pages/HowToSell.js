import React from "react";
import ResourceSidebar from "../../common/ResourceSidebar";

const HowToSell = () => {
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
                  Here you can ﬁnd answers to our most frequently asked
                  questions and learn about the market place, how to use it, how
                  to stay safe and get in touch with us.
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                <ResourceSidebar />
                  <div class="col-md-7 offset-md-1">
                    <h4 class="bold-green-text mb-4">
                      How to sell fast on Tinkoko
                    </h4>
                    <div class="media">
                      <h1 class="media-header">
                        <img
                          src="../images/file.PNG"
                          alt=""
                          class="img-fluid"
                        />
                      </h1>
                      <div class="media-body">
                        <h4 class="bold-green-text">Get Your Products Ready</h4>
                        <p>* Agro products have standard market prices</p>
                        <p>
                          * Check for the current prices of produce or
                          equipments
                        </p>
                        <p>
                          * Decide on the right price that is competitive for
                          you to sell
                        </p>
                      </div>
                    </div>

                    <div class="media">
                      <h1 class="media-header">
                        <img
                          src="../images/file.PNG"
                          alt=""
                          class="img-fluid"
                        />
                      </h1>
                      <div class="media-body">
                        <h4 class="bold-green-text">
                          Capture clear & optimal photos
                        </h4>
                        <p>
                          * Pictures of your products should always come clean &
                          presentable
                        </p>
                        <p>
                          * Take clear photos - use good lighting and different
                          angles.
                        </p>
                      </div>
                    </div>

                    <div class="media">
                      <h1 class="media-header">
                        <img
                          src="../images/file.PNG"
                          alt=""
                          class="img-fluid"
                        />
                      </h1>
                      <div class="media-body">
                        <h4 class="bold-green-text">
                          Provide clear details in your ad
                        </h4>
                        <p>* More details = more attention!</p>
                        <p>
                          * Include keywords and information that buyers will be
                          interested in.
                        </p>
                        <p>
                          * Be honest & straight to the point in your
                          description
                        </p>
                      </div>
                    </div>

                    <div class="media">
                      <h1 class="media-header">
                        <img
                          src="../images/file.PNG"
                          alt=""
                          class="img-fluid"
                        />
                      </h1>
                      <div class="media-body">
                        <h4 class="bold-green-text">Promote your ad!</h4>
                        <p>* Promoted ads get up to 10 times more views.</p>
                        <p>* More views = more interested buyers</p>
                        <p>
                          * With lots of interested buyers, you have a better
                          chance of selling fast for the price that you want.
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

export default HowToSell;
