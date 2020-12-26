import React from "react";
import ResourceSidebar from "../../common/ResourceSidebar";

const Buynow = () => {
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
                    <h4 class="bold-green-text mb-4">Buy now with Tinkoko</h4>
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
                          Tinkoko can take care of your orders
                        </h4>
                        <p>
                          * You can ﬁlter products on your timeline to show only
                          Buy Now items
                        </p>
                        <p>
                          * Buy Now items are items fulﬁlled by Tinkoko directly
                        </p>
                        <p>
                          * You have the option to pay with different payment
                          options in real time
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
                          We take the stress from you
                        </h4>
                        <p>
                          * You can shop by adding BUY NOW items to card and pay
                          on Tinkoko
                        </p>
                        <p>
                          * We produce the item from the seller and ship to your
                          door step
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
                          Items are delivered by Tinkoko
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
                        <h4 class="bold-green-text">
                          Seller gets payment after buyer receives item(s)
                        </h4>
                        <p>
                          * We ensure safety of both parties by handling the
                          payment & settlements
                        </p>
                        <p>
                          * More trust is built as Tinkoko ensures a smooth,
                          hassle free process.
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

export default Buynow;
