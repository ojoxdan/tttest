import React from "react";
import ResourceSidebar from "../../common/ResourceSidebar";

const Contact = () => {
  return (
    <>
      <section class="default-container">
        <div class="container">
          <div class="white-bg">
            <div class="row mb-4">
              <div class="col-md-8 offset-md-2 text-center">
                <h3 class="bold-green-text mb-2">Contact Us</h3>
                <p class="grey-text">
                  How can we help you today? If you are looking for answers to
                  the most frequently asked questions, kindly visit the FAQ page
                  <span>
                    <a href="faqs.html" class="underline">
                      here.
                    </a>
                  </span>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                <ResourceSidebar />
                  <div class="col-md-7 offset-md-1 mt-5">
                    <div class="contact-us-wrapper text-center">
                      <div class="help mb-5">
                        <h5 class="mb-4">Still need help?</h5>
                        <h6 class="mb-4">
                          Open a support ticket and we’ll get back to you within
                          24 hours. If you have an urgent issue and want to
                          speak with a customer care representative,
                        </h6>
                        <h5 class="bold-green-text mb-4">081 009 128 9870</h5>
                        <h6>
                          Service hours: Mon - Fri, 9am - 5pm; Saturday, 10am -
                          3pm <br />
                          Public holidays: 10am - 3pm
                        </h6>
                      </div>

                      <div class="difficulty">
                        <h5 class="mb-4">
                          If you have difﬁculty placing your order, please call
                          us on the following number
                        </h5>
                        <h5 class="bold-green-text mb-4">01 277 2367</h5>
                        <h6 class="mb-4">
                          Service hours: Mon - Fri, 9am - 5pm; Saturday, 10am -
                          3pm <br />
                          Public holidays: 10am - 3pm
                        </h6>
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

export default Contact;
