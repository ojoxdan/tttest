import React from 'react'

function ResourceSidebar() {
    return (
        <div class="col-md-4">
        <button id="toggle" class="collapsible d-md-none">
          <span class="mr-3">
            <i class="fa fa-bars"></i>
          </span>
          Toggle Menu
        </button>
        <div class="sidebar-menu d-md-block d-lg-block">
          <ul>
            <li>
              <a href="/resource/how-to-sell">How To Sell on Tinkoko</a>
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

            <li class="active">
              <a href="/resource/advertising">Advertising</a>
            </li>

            <li>
              <a href="/resource/faq">FAQs</a>
            </li>

            <li>
              <a href="/resource/stay-safe">
                Stay Safe on Tinkoko Market
              </a>
            </li>

            <li>
              <a href="contact.html">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    )
}

export default ResourceSidebar
